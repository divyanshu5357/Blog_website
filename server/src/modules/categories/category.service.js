import prisma from "../../config/db.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import { generateSlug } from "../../utils/slugify.js";
const generateUniqueSlug = async (name) => {
  const baseSlug = generateSlug(name);

  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const existing = await prisma.category.findUnique({
      where: {
        slug,
      },
    });

    if (!existing) {
      return slug;
    }

    slug = `${baseSlug}-${counter}`;
    counter++;
  }
};
export const createCategoryService = async (data) => {
  const { name, description, image, parentId } = data;
  const slug = await generateUniqueSlug(name);

  if (!name || !slug) {
    throw new ApiError(400, "Name and slug are required.");
  }

  const exists = await prisma.category.findUnique({
    where: { slug },
  });

  if (exists) {
    throw new ApiError(409, "Category slug already exists.");
  }
  console.log("Incoming category data:", data);
console.log("parentId:", parentId);
console.log("parentId type:", typeof parentId);

  const category = await prisma.category.create({
  data: {
    name,
    slug,
    description,
    image,
    parentId: parentId || null,
  },
});

  return new ApiResponse(201, "Category created successfully.", category);
};

export const getAllCategoriesService = async () => {
  const categories = await prisma.category.findMany({
    include: {
      parent: true,
      children: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return new ApiResponse(200, "Categories fetched successfully.", categories);
};

export const getCategoryByIdService = async (id) => {
  const category = await prisma.category.findUnique({
    where: { id },
    include: {
      parent: true,
      children: true,
    },
  });

  if (!category) {
    throw new ApiError(404, "Category not found.");
  }

  return new ApiResponse(200, "Category fetched successfully.", category);
};

export const updateCategoryService = async (id, data) => {
  const category = await prisma.category.findUnique({
    where: { id },
  });

  if (!category) {
    throw new ApiError(404, "Category not found.");
  }

  const {
    name,
    description,
    image,
    parentId,
  } = data;

  let slug = category.slug;

  // Generate a new unique slug only if the name changes
  if (name && name !== category.name) {
    slug = await generateUniqueSlug(name);
  }

  const updated = await prisma.category.update({
    where: { id },
    data: {
      name: name ?? category.name,
      slug,
      description: description ?? category.description,
      image: image ?? category.image,
      parentId: parentId ?? category.parentId,
    },
  });

  return new ApiResponse(
    200,
    "Category updated successfully.",
    updated
  );
};
export const deleteCategoryService = async (id) => {
  const category = await prisma.category.findUnique({
    where: { id },
  });

  if (!category) {
    throw new ApiError(404, "Category not found.");
  }

  await prisma.category.delete({
    where: { id },
  });

  return new ApiResponse(200, "Category deleted successfully.", null);
};
export const getCategoryPostsService = async (slug) => {
  const category = await prisma.category.findUnique({
    where: {
      slug,
    },
    include: {
      children: true,
    },
  });

  if (!category) {
    throw new ApiError(404, "Category not found.");
  }

  const categoryIds = [
    category.id,
    ...category.children.map((c) => c.id),
  ];

  const posts = await prisma.post.findMany({
    where: {
      categoryId: {
        in: categoryIds,
      },
      status: "PUBLISHED",
    },
    include: {
      author: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return new ApiResponse(
    200,
    "Category fetched successfully.",
    {
      category,
      posts,
    }
  );
};