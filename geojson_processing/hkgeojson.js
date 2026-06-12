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
    const { filterProperty, filterList} = options;

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
        for(let i = 0; i < filterList.length; i++){
            if(feature.properties[filterProperty] === filterList[i]){
                return true;
            }
        }
        return false;
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
    console.log("hi");

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

    console.log("hi");
    console.log(geoJSON.length);
    
    return outputGeoJSON;
}


//verifying that this is everything



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


filterGeoJSON(
    '../hk_geojson/FB_ROUTE_gdb_FB_ROUTE_LINE_converted.geojson',
    '../hk_geojson/specific_hkgeojson.json',
    {
        filterProperty: 'routeId',
        filterList: [1890, 1665],
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



//analysis
function analyzeJson(filePath) {
    let data;
    
    try {
        const rawData = fs.readFileSync(filePath, 'utf-8');
        data = JSON.parse(rawData);
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.error(`Error: File '${filePath}' not found.`);
            return;
        }
        console.error(`Error: Invalid JSON - ${err.message}`);
        return;
    }

    // Check if 'features' array exists
    if (!data.hasOwnProperty('features')) {
        console.error("Error: No 'features' array found in the JSON.");
        return;
    }

    const features = data.features;

    if (!Array.isArray(features)) {
        console.error("Error: 'features' is not an array.");
        return;
    }

    // Count types in features
    const typeCounts = {};
    let objectsWithoutType = 0;

    features.forEach((feature, index) => {
        if (feature !== null && typeof feature === 'object' && feature.hasOwnProperty('type')) {
            const type = feature.type;
            typeCounts[type] = (typeCounts[type] || 0) + 1;
        } else {
            objectsWithoutType++;
            console.warn(`Warning: Feature at index ${index} has no 'type' property`);
        }
    });

    // Sort by count (descending), then by type name
    const sortedTypes = Object.entries(typeCounts)
        .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));

    // Print results
    console.log(`\nFile: ${filePath}`);
    console.log(`Root 'type': ${data.type || 'Not specified'}`);
    console.log(`Total features: ${features.length}`);
    console.log(`\nBreakdown by 'type' in features:`);
    console.log('-'.repeat(40));

    for (const [typeName, count] of sortedTypes) {
        console.log(`  ${typeName}: ${count}`);
    }

    if (objectsWithoutType > 0) {
        console.log(`  (no type): ${objectsWithoutType}`);
    }

    return typeCounts;
}

// Run analysis of the geojson

//analyzeJson("../hk_geojson/JSON_BUS (1).json");


function inspectJSONProperties(filePath) {
    try {
        const rawData = fs.readFileSync(filePath, 'utf-8');
        data = JSON.parse(rawData);
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.error(`Error: File '${filePath}' not found.`);
            return;
        }
        console.error(`Error: Invalid JSON - ${err.message}`);
        return;
    }

    
    if (typeof data !== 'object' || data === null) {
        return { type: typeof data, properties: null };
    }
    
    if (Array.isArray(data)) {
        return {
            type: 'array',
            length: data.length,
            sampleItem: data.length > 0 ? inspectJSONProperties(data[0]) : null
        };
    }
    
    const properties = {};
    for (const key of Object.keys(data)) {
        const value = data[key];
        properties[key] = {
            type: Array.isArray(value) ? 'array' : (value === null ? 'null' : typeof value),
            isObject: typeof value === 'object' && value !== null && !Array.isArray(value)
        };
    }
    
    return {
        type: 'object',
        propertyCount: Object.keys(data).length,
        properties: properties
    };
}


//console.log(inspectJSONProperties("../hk_geojson/JSON_BUS (1).json"));