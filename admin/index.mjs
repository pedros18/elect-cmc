import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';
import { readdirSync } from 'fs';

const app = express();
const port = process.env.PORT || 5000;

// Define __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());

// Dynamic route loading
const routesPath = path.resolve(__dirname, './routes');

try {
    const routeFiles = readdirSync(routesPath);
    routeFiles.forEach(async (file) => {
        try {
            const routeModule = await import(`./routes/${file}`);
            if (routeModule.default) {
                console.log(`Loaded route: ${file}`);
                app.use('/', routeModule.default);
            } else {
                console.error(`Route module ${file} does not have a default export.`);
            }
        } catch (error) {
            console.error(`Failed to load route module: ${file}`, error);
        }
    });
} catch (error) {
    console.error('Failed to read routes directory:', error);
}

// Serve the index.html file
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
