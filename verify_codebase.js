const fs = require('fs');
const path = require('path');

console.log("=== INTEGRITY CHECK: FIREBASE IMPLEMENTATION ===");

let errors = 0;

// 1. Check package.json
try {
    const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    if (pkg.dependencies && pkg.dependencies.firebase) {
        console.log("[PASS] 'firebase' dependency found in package.json");
    } else {
        console.error("[FAIL] 'firebase' missing from package.json");
        errors++;
    }
} catch (e) {
    console.error("[FAIL] Could not read package.json");
    errors++;
}

// 2. Check AuthContext.jsx for Real Auth Logic
try {
    const authContext = fs.readFileSync('src/context/AuthContext.jsx', 'utf8');
    if (authContext.includes('signInWithPopup') && authContext.includes('firebase/auth')) {
        console.log("[PASS] AuthContext.jsx uses 'signInWithPopup'");
    } else {
        console.error("[FAIL] AuthContext.jsx does NOT use 'signInWithPopup' (Simulated logic?)");
        errors++;
    }
} catch (e) {
    console.error("[FAIL] Could not read AuthContext.jsx");
    errors++;
}

// 3. Check firebase.js
if (fs.existsSync('src/lib/firebase.js')) {
    console.log("[PASS] src/lib/firebase.js exists");
} else {
    console.error("[FAIL] src/lib/firebase.js missing");
    errors++;
}

console.log("================================================");
if (errors === 0) {
    console.log("RESULT: PASSED. Codebase is correctly configured for Real Firebase.");
} else {
    console.log(`RESULT: FAILED with ${errors} errors.`);
}
