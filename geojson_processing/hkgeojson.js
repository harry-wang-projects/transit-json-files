const fs = require('fs');

/**
 * Reads a GeoJSON file, filters features by property, and drops specified properties
 * @param {string} inputFilePath - Path to the input JSON file
 * @param {string} outputFilePath - Path to write the filtered JSON
 * @param {Object} options - Configuration options
 * @param {string} options.filterProperty - Property name to filter by (e.g., 'routeNameC')
 * @param {*} options.filterValue - Value to match (e.g., '1')
 * @param {string[]} options.propertiesToDrop - Array of property names to remove
 */
function filterGeoJSON(inputFilePath, outputFilePath, options) {
    const { filterProperty, filterValue} = options;

    // Read and parse the JSON file
    const rawData = fs.readFileSync(inputFilePath, 'utf8');
    const geoJSON = JSON.parse(rawData);

    // Validate structure
    if (!geoJSON.features || !Array.isArray(geoJSON.features)) {
        throw new Error('Invalid GeoJSON: "features" array not found');
    }

    // Filter features by property value
    const filteredFeatures = geoJSON.features.filter(feature => {
        if (!feature.properties) return false;
        return feature.properties[filterProperty] === filterValue;
    });

    // Drop specified properties from each feature
    const cleanedFeatures = filteredFeatures

    // Build the output GeoJSON
    const outputGeoJSON = {
        type: "FeatureCollection",
        features: cleanedFeatures
    };

    // Write to output file
    fs.writeFileSync(outputFilePath, JSON.stringify(outputGeoJSON, null, 2), 'utf8');

    console.log(`Original features: ${geoJSON.features.length}`);
    console.log(`Filtered features: ${filteredFeatures.length}`);
    console.log(`Output written to: ${outputFilePath}`);
    
    return outputGeoJSON;
}

function droponly(inputFilePath, outputFilePath, options) {
    const { filterProperty, filterValue, propertiesToDrop = [] } = options;

    // Read and parse the JSON file
    const rawData = fs.readFileSync(inputFilePath, 'utf8');
    const geoJSON = JSON.parse(rawData);

    const filteredFeatures = geoJSON.features;
    // Drop specified properties from each feature
    const cleanedFeatures = filteredFeatures.map(feature => {
        const newFeature = JSON.parse(JSON.stringify(feature)); // Deep copy
        if (newFeature.properties && propertiesToDrop.length > 0) {
            propertiesToDrop.forEach(prop => {
                delete newFeature.properties[prop];
            });
        }
        return newFeature;
    });

    // Build the output GeoJSON
    const outputGeoJSON = {
        type: "FeatureCollection",
        features: cleanedFeatures
    };

    // Write to output file
    fs.writeFileSync(outputFilePath, JSON.stringify(outputGeoJSON, null, 2), 'utf8');

    console.log(`Original features: ${geoJSON.features.length}`);
    console.log(`Filtered features: ${filteredFeatures.length}`);
    console.log(`Output written to: ${outputFilePath}`);
    
    return outputGeoJSON;
}

// ============ EXAMPLE USAGE ============

// Example 1: Filter by routeNameC = "1" and drop lastUpdateDate
/*
droponly(
    '../hk_geojson/JSON_BUS (1).json',           // Your input file
    '../hk_geojson/cleaned_hkgeojson.json', // Output file
    {
        filterProperty: '',
        filterValue: '',
        propertiesToDrop: [
            'lastUpdateDate',
            'hyperlinkC',
            'hyperlinkS',
            'hyperlinkE',
            'routeType',
            'specialType',
            'routeNameC',
            'routeNameS',
            'stopNameC',
            'stopNameS',
            'locEndNameC',
            'locEndNameS',
            'fullFare',
            'district'
        ]
    }
);
*/


// Example 2: Filter by companyCode = "KMB" and drop multiple properties
filterGeoJSON(
    '../hk_geojson/cleaned_hkgeojson.json',
    '../hk_geojson/specific_hkgeojson.json',
    {
        filterProperty: 'routeId',
        filterValue: 1890,
    }
);

/*
// Example 3: Filter by routeId and keep only essential stop info
filterGeoJSON(
    'input.json',
    'output_route_1001.json',
    {
        filterProperty: 'routeId',
        filterValue: 1001,
        propertiesToDrop: ['lastUpdateDate', 'district', 'serviceMode', 'journeyTime']
    }
);
*/