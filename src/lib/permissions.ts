export const isBypassRoutes = [
    "/api/webhook/ls",
    "/api/inngest(.*)",
    "/api/auth(.*)",
    "/convex(.*)"
]

export const isPublicRoutes = [
    '/auth(.*)',
    "/"
]

export const isProtectedRoutes = ["/dashboard(.*)"]