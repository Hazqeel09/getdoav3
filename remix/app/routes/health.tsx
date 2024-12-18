import type { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = async () => {
  try {
    // add health check later on

    return new Response(JSON.stringify({ status: "healthy" }), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        status: "unhealthy",
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      { status: 500 }
    );
  }
};
