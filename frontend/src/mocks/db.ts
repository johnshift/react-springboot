import { factory, primaryKey } from "@mswjs/data";
import { users } from "./users";
import { reactions } from "./reactions";
import { posts } from "./posts";
import { userVeils } from "./user_veil";
import { credentials } from "./credentials";
import { groups } from "./groups";
import { memberships } from "./membership";

export const db = factory({
  credentials: {
    id: primaryKey(Number),
    username: String,
    password: String,
    email: String,
    userVeilId: Number,
  },

  user: {
    id: primaryKey(Number),
    name: String,
    desc: String,
    type: Number, // user = 0, veil = 1
  },

  userVeil: {
    id: primaryKey(Number),
    userId: Number,
    veilId: Number,
  },

  reaction: {
    id: primaryKey(Number),
    ownerId: Number,
    reaction: String,
    // composite FK: ref+type
    refId: Number,
    type: Number, // post = 0, comment = 1
  },

  post: {
    id: primaryKey(Number),
    ownerId: Number,
    created: String,
    body: String,
    voteCount: Number,
    commentCount: Number,
  },

  group: {
    id: primaryKey(Number),
    name: String,
    desc: String,
  },

  membership: {
    id: primaryKey(Number),
    groupId: Number,
    userId: Number,
    type: Number, // admin = 0, member = 1
  },
});

// CREDENTIALS
credentials.forEach((c) => db.credentials.create(c));

// USERS
users.forEach((u) => db.user.create(u));

// USER-VEIL
userVeils.forEach((uv) => db.userVeil.create(uv));

// GROUPS
groups.forEach((g) => db.group.create(g));

// MEMBERSHIPS
memberships.forEach((m) => db.membership.create(m));

// REACTIONS
reactions.forEach((r) => db.reaction.create(r));

// POSTS
posts.forEach((p) => db.post.create(p));
