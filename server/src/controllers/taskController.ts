import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/** GETTASKS */
export const getTasks = async (req: Request, res: Response): Promise<void> => {
  const { projectId } = req.query;
  try {
    const tasks = await prisma.task.findMany({
      where: {
        projectId: Number(projectId),
      },
      include: {
        author: true,
        assignee: true,
        comments: true,
        attachments: true,
      },
    });
    res.json(tasks);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error retrieving tasks ${error.message} ` });
  }
};

/**CREATE TASK */
export const createTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
    title,
    description,
    status,
    priority,
    tags,
    startDate,
    dueDate,
    points,
    projectId,
    authorUserId,
    assignedUserId,
  } = req.body; // grab the list of name, desc, start date , end date

  try {
    const newTasks = await prisma.task.create({
      data: {
        title,
        description,
        status,
        priority,
        tags,
        startDate,
        dueDate,
        points,
        projectId,
        authorUserId,
        assignedUserId,
      },
    });
    res.status(201).json(newTasks);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error creating Tasks: ${error.message} ` });
  }
};

/**UPDATE TASKS */
export const updateTaskStatus = async (req: Request, res: Response): Promise<void> => {
    const { taskId } = req.params;
    const {status} = req.body;

    try {
      const updateTasks = await prisma.task.update({
        where: {
          id: Number(taskId),
        },
        data: {
          status: status,
        },
      });
      res.json(updateTasks);
    } catch (error: any) {
      res
        .status(500)
        .json({ message: `Error updating tasks ${error.message} ` });
    }
  };

  
  export const getUserTasks = async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.params;
    try {
      const tasks = await prisma.task.findMany({
        where: {
          OR: [
            {authorUserId: Number(userId)},
            {assignedUserId: Number(userId)},
          ],
        },
        include: {
          author: true,
          assignee: true,
        },
      });
      res.json(tasks);
    } catch (error: any) {
      res
        .status(500)
        .json({ message: `Error retrieving user's tasks ${error.message} ` });
    }
  };