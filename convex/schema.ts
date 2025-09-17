import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";


const schema = defineSchema({
    ...authTables,
    subscriptions: defineTable({
        userId: v.id("users"),
        polarCustomerId: v.string(),
        polarSubscriptionId: v.string(),
        productId: v.string(),
        priceId: v.string(),
        planCode: v.optional(v.string()),
        status: v.string(),
        currentPeriodEnds: v.optional(v.number()),
        trialEndsAt: v.optional(v.number()),
        cancelAt: v.optional(v.number()),
        canceledAt: v.optional(v.number()),
        seats: v.optional(v.number()),
        metadata: v.optional(v.any()),
        creditsBalance: v.number(),
        creditsGrantPeriod: v.number(),
        creditsRolloverLimit: v.number(),
        lastGrantCursor: v.optional(v.string())
    })
        .index('by_userId', ['userId'])
        .index('by_polarSubscriptionId', ['polarSubscriptionId'])
        .index('by_status', ['status'])
    ,
    credits_ledger: defineTable({
        userId: v.id("users"),
        subscriptionId: v.id("subscriptions"),
        amount: v.number(),
        type: v.string(),
        reason: v.optional(v.string()),
        idempotencyKey: v.optional(v.string()),
        meta: v.optional(v.any())
    })
        .index('by_subscriptionId', ['subscriptionId'])
        .index('by_userId', ['userId'])
        .index('by_idempotencyKey', ['idempotencyKey'])
    ,
    projects: defineTable({
        userId: v.id("users"),
        name: v.string(),
        description: v.optional(v.string()),
        styleGuide: v.optional(v.string()),
        sketchesData: v.any(),
        viewportData: v.optional(v.any()),
        generatedDesignData: v.optional(v.any()),
        thumbnail: v.optional(v.string()),
        moodBoardImages: v.optional(v.array(v.string())),
        inspirationImages: v.optional(v.array(v.string())),
        lastModified: v.number(),
        createdAt: v.number(),
        isPublic: v.optional(v.boolean()),
        tags: v.optional(v.array(v.string())),
        projectNumber: v.number()
    }),
    project_counters: defineTable({
        userId: v.id("users"),
        nextProjectNumber: v.number() // Next available project number for this user
    }).index("by_userId", ['userId'])
});

export default schema;