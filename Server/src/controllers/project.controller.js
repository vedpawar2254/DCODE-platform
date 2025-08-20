import Project from '../models/project.model.js';
import { ApiError } from '../utils/api-error.js';
import { ApiResponse } from '../utils/api-response.js';

export const createProject = async (req, res) => {
  try {
    const { name, description, image_url, repository_url, organization, readme, tech_stack, tags, live_demo_url, assigned_mentor } = req.body;
    if (!name) {
      return res.status(400).json(new ApiError(400, 'Project name is required'));
    }
    const project = new Project({ name, description, image_url, repository_url, organization, readme, tech_stack, tags, live_demo_url, assigned_mentor });
    await project.save();
    return res.status(201).json(new ApiResponse(201, 'Project created successfully', project));
  } catch (err) {
    return res.status(500).json(new ApiError(500, `Internal server error while creating project: ${err.message}`));
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate("organization");
    return res.status(200).json(new ApiResponse(200, 'Projects retrieved successfully', projects));
  } catch (err) {
    return res.status(500).json(new ApiError(500, `Internal server error while retrieving projects: ${err.message}`));
  }
};

export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json(new ApiError(400, 'Project ID is required'));
    }
    const project = await Project.findById(id).populate('organization');
    if (!project) {
      return res.status(404).json(new ApiError(404, 'Project not found'));
    }
    return res.status(200).json(new ApiResponse(200, 'Project retrieved successfully', project));
  } catch (err) {
    return res.status(500).json(new ApiError(500, `Internal server error while retrieving project: ${err.message}`));
  }
};

export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json(new ApiError(400, 'Project ID is required'));
    }
    const updated = await Project.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!updated) {
      return res.status(404).json(new ApiError(404, 'Project not found'));
    }
    return res.status(200).json(new ApiResponse(200, 'Project updated successfully', updated));
  } catch (err) {
    return res.status(400).json(new ApiError(400, `Error while updating project: ${err.message}`));
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json(new ApiError(400, 'Project ID is required'));
    }
    const deleted = await Project.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json(new ApiError(404, 'Project not found'));
    }
    return res.status(200).json(new ApiResponse(200, 'Project deleted successfully'));
  } catch (err) {
    return res.status(500).json(new ApiError(500, `Internal server error while deleting project: ${err.message}`));
  }
};
