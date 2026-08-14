export const getRelatedPosts = async (
  req,
  res,
  next
) => {
  try {
    const response =
      await getRelatedPostsService(
        req.params.slug
      );

    res
      .status(response.statusCode)
      .json(response);

  } catch (err) {
    next(err);
  }
};