const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '../public');
const FAVICON_SRC = path.join(PUBLIC_DIR, 'favicon.ico');
const TEMP_PNG = path.join(PUBLIC_DIR, 'temp-favicon.png');

// List of favicon files to generate
const FAVICON_FILES = [
    // Standard favicons
    { name: 'favicon-16x16.png', size: 16 },
    { name: 'favicon-32x32.png', size: 32 },

    // Apple Touch Icons
    { name: 'apple-touch-icon.png', size: 180 },
    { name: 'apple-touch-icon-152x152.png', size: 152 },
    { name: 'apple-touch-icon-180x180.png', size: 180 },

    // Android/Chrome
    { name: 'android-chrome-192x192.png', size: 192 },
    { name: 'android-chrome-512x512.png', size: 512 },

    // Microsoft Tiles
    { name: 'mstile-70x70.png', size: 70 },
    { name: 'mstile-144x144.png', size: 144 },
    { name: 'mstile-150x150.png', size: 150 },
    { name: 'mstile-310x150.png', width: 310, height: 150 },
    { name: 'mstile-310x310.png', size: 310 }
];

async function convertIcoToPng() {
    try {
        // Use a simple SVG as a fallback if ICO conversion fails
        const fallbackSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
        <rect width="64" height="64" rx="12" fill="#4B0082"/>
        <path d="M32 48L16 32l16-16 16 16z" fill="#D4AF37"/>
      </svg>
    `;

        try {
            // Try to convert ICO to PNG using sharp
            await sharp(FAVICON_SRC)
                .png()
                .toFile(TEMP_PNG);
            return TEMP_PNG;
        } catch (e) {
            console.log('Could not convert ICO file, using fallback SVG');
            // If conversion fails, use the fallback SVG
            await fs.writeFile(TEMP_PNG, Buffer.from(fallbackSvg));
            return TEMP_PNG;
        }
    } catch (error) {
        console.error('Error in ICO to PNG conversion:', error);
        throw error;
    }
}

async function cleanupTempFiles() {
    try {
        if (await fs.access(TEMP_PNG).then(() => true).catch(() => false)) {
            await fs.unlink(TEMP_PNG);
            console.log('Cleaned up temporary files');
        }
    } catch (error) {
        console.error('Error cleaning up temporary files:', error);
    }
}

async function cleanOldFavicons() {
    console.log('Cleaning up old favicon files...');
    const filesToDelete = [
        ...FAVICON_FILES.map(f => f.name),
        'browserconfig.xml',
        'site.webmanifest',
        'safari-pinned-tab.svg',
        TEMP_PNG
    ];

    await Promise.all(
        filesToDelete.map(async (file) => {
            try {
                const filePath = path.join(PUBLIC_DIR, file.split('/').pop());
                await fs.unlink(filePath);
                console.log(`Deleted old file: ${file}`);
            } catch (err) {
                // File doesn't exist or couldn't be deleted, which is fine
            }
        })
    );
}

async function generateFavicons() {
    let tempPngPath = '';

    try {
        // Clean up old favicon files first
        await cleanOldFavicons();

        // Convert ICO to PNG first
        tempPngPath = await convertIcoToPng();

        // Create manifest file
        const manifest = {
            name: 'Imperial Perfumes',
            short_name: 'Imperial',
            description: 'Luxury Fragrances',
            start_url: '/',
            display: 'standalone',
            background_color: '#4B0082',
            theme_color: '#4B0082',
            icons: [
                {
                    src: '/android-chrome-192x192.png',
                    sizes: '192x192',
                    type: 'image/png',
                    purpose: 'any maskable',
                },
                {
                    src: '/android-chrome-512x512.png',
                    sizes: '512x512',
                    type: 'image/png',
                },
            ],
        };

        // Generate all favicon files
        await Promise.all(
            FAVICON_FILES.map(async ({ name, size, width, height }) => {
                const outputPath = path.join(PUBLIC_DIR, name);

                try {
                    const resizeOptions = {
                        width: width || size,
                        height: height || size,
                        fit: 'contain',
                        background: { r: 0, g: 0, b: 0, alpha: 0 }
                    };

                    await sharp(tempPngPath)
                        .resize(resizeOptions)
                        .toFile(outputPath);
                    console.log(`Generated ${name}`);
                } catch (error) {
                    console.error(`Error generating ${name}:`, error.message);
                }
            })
        );

        // Generate Safari Pinned Tab SVG
        const safariPinnedTab = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
        <path d="M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16z" fill="#4B0082"/>
        <path d="M16 6L6 16l10 10 10-10z" fill="#D4AF37"/>
      </svg>
    `;

        await fs.writeFile(
            path.join(PUBLIC_DIR, 'safari-pinned-tab.svg'),
            safariPinnedTab.trim()
        );
        console.log('Generated safari-pinned-tab.svg');

        // Write manifest file
        await fs.writeFile(
            path.join(PUBLIC_DIR, 'site.webmanifest'),
            JSON.stringify(manifest, null, 2)
        );
        console.log('Generated site.webmanifest');

        // Create browserconfig.xml for Windows tiles
        const browserConfig = `
      <?xml version="1.0" encoding="utf-8"?>
      <browserconfig>
        <msapplication>
          <tile>
            <square70x70logo src="/mstile-70x70.png"/>
            <square150x150logo src="/mstile-150x150.png"/>
            <square310x310logo src="/mstile-310x310.png"/>
            <TileColor>#4B0082</TileColor>
          </tile>
        </msapplication>
      </browserconfig>
    `;

        await fs.writeFile(
            path.join(PUBLIC_DIR, 'browserconfig.xml'),
            browserConfig.trim()
        );
        console.log('Generated browserconfig.xml');

        console.log('\n✅ All favicon files generated successfully!');
    } catch (error) {
        console.error('❌ Error generating favicons:', error);
        process.exit(1);
    } finally {
        // Clean up temporary files
        await cleanupTempFiles();
    }
}

generateFavicons();
