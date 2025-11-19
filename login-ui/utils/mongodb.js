import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

function sanitizeDbName(name) {
  if (!name) return null;
  // Remove characters not allowed in MongoDB database names
  const sanitized = name.replace(/[^a-zA-Z0-9_-]/g, "");
  return sanitized || null;
}

function stripDbPathFromUri(uri) {
  try {
    const u = new URL(uri);
    // Remove pathname (db segment) so we can pass dbName via options safely
    u.pathname = "/";
    return u.toString();
  } catch (_) {
    // Fallback: strip everything after host's first slash if possible
    const match = uri.match(/^(mongodb(?:\+srv)?:\/\/[^\/]+)\/(?:[^?]*)?(.*)$/i);
    if (match) {
      return match[1] + (match[2] || "");
    }
    return uri;
  }
}

async function connectToDatabase() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const options = { bufferCommands: false };

    // Try to detect an invalid db name in the URI and fix it by stripping the path
    let uriToUse = MONGODB_URI;
    let dbNameFromUri = null;
    try {
      const u = new URL(MONGODB_URI);
      const path = (u.pathname || "").replace(/^\//, "");
      dbNameFromUri = path && path.split("?")[0];
    } catch (_) {
      // ignore
    }

    const sanitizedDbName = sanitizeDbName(dbNameFromUri);
    if (dbNameFromUri && dbNameFromUri !== sanitizedDbName) {
      // If the db name contains illegal characters (like '.'), strip it from URI
      // and pass a safe dbName via options.
      uriToUse = stripDbPathFromUri(MONGODB_URI);
      options.dbName = sanitizedDbName || "nextjs";
      console.warn(
        `Invalid database name '${dbNameFromUri}' detected in MONGODB_URI. Using dbName='${options.dbName}' instead.`
      );
    }

    cached.promise = mongoose.connect(uriToUse, options).then((m) => m);
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null;
    throw err;
  }

  return cached.conn;
}

export default connectToDatabase;
