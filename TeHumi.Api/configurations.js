// ==========
// PORT
// ==========
export const PORT = process.env.PORT || 4000;

// ==========
// DATABASE
// ==========
export const DB_USER = 'admin';
export const DB_PASSWORD = 'admin123$';
export const DB_URL = `mongodb://${DB_USER}:${DB_PASSWORD}@ds345597.mlab.com:45597/temperatures-humidities`;