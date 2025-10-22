import { axiosInstance } from '../utils/axios'; // Make sure this is the correct path

/**
 * Fetches the leaderboard data from the API.
 * @param {object} params - The query parameters for the API.
 * (etc.)
 */
export const getLeaderboardData = async (params) => {
  console.log('[getLeaderboardData] Fetching with params:', params);

  try {
    let endpoint = '/stats/leaderboard';
    let apiParams = {
      metric: params.metric,
      period: params.period,
      limit: params.limit,
      page: params.page,
      includeAll: params.includeAll,
    };

    // Check if we are fetching for the streak leaderboard
    if (params.metric === 'currentStreak' || params.metric === 'longestStreak') {
      endpoint = '/stats/streak/leaderboard';
      apiParams = {
        type: params.metric === 'currentStreak' ? 'current' : 'longest',
        limit: params.limit,
      };
    }

    console.log(`[getLeaderboardData] Calling API: ${endpoint} with params:`, apiParams);
    const response = await axiosInstance.get(endpoint, { params: apiParams });
    
    console.log('[getLeaderboardData] Raw API response:', response.data);

    // The response structure is: {success, message, statusCode, data}
    // The actual data is in response.data.message, not response.data.data
    const responseData = response.data.message;

    if (!responseData) {
      throw new Error('No data received from API');
    }

    if (endpoint === '/stats/streak/leaderboard') {
      // For streak leaderboard
      const normalizedData = {
        users: (responseData.leaderboard || []).map(entry => ({
          id: entry.user.id,
          name: entry.user.name,
          github_username: entry.user.github_username,
          avatar: entry.user.avatar, 
          bio: entry.user.bio, 
          location: entry.user.location, 
          createdAt: 'N/A', 
          stats: {
            currentStreak: entry.currentStreak,
            longestStreak: entry.longestStreak,
            lastCommitDate: entry.lastCommitDate,
          }
        })),
        pagination: responseData.pagination || {
          currentPage: 1,
          totalPages: 1,
          totalCount: responseData.leaderboard?.length || 0,
          hasNextPage: false,
          hasPrevPage: false,
          limit: params.limit
        }
      };
      console.log('[getLeaderboardData] Returning NORMALIZED STREAK data:', normalizedData);
      return normalizedData;
    }

    // For the stats leaderboard
    const normalizedData = {
      users: (responseData.leaderboard || []).map(entry => ({
        ...entry.user, 
        stats: {
          totalCommits: entry.totalCommits,
          totalLOC: entry.totalLOC,
          totalMergedPRs: entry.totalMergedPRs,
          reposContributed: entry.projectCount, 
          languageCount: entry.languageCount,
          languagesWithPercentage: entry.languagesWithPercentage,
        }
      })),
      pagination: responseData.pagination || {
        currentPage: 1,
        totalPages: 1,
        totalCount: responseData.leaderboard?.length || 0,
        hasNextPage: false,
        hasPrevPage: false,
        limit: params.limit
      }
    };
    
    console.log('[getLeaderboardData] Returning NORMALIZED STATS data:', normalizedData);
    return normalizedData;

  } catch (error) {
    console.error('Error fetching leaderboard data:', error);
    throw error.response?.data?.message || 'Failed to fetch leaderboard';
  }
};