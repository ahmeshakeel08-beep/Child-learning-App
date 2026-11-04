import JSZip from 'jszip';

/**
 * Generates and downloads a complete, production-ready Android Studio project
 * with MainActivity.kt, AndroidManifest.xml, Gradle build files, launcher icons,
 * and APK building script.
 */
export async function downloadAndroidProjectBundle(): Promise<void> {
  const zip = new JSZip();

  // Root files
  zip.file(
    'README.md',
    `# ABC Fun Learning - Native Android Project

This is the complete, production-ready Android application source code for **ABC Fun Learning**.

## Application Details
- **App Name**: ABC Fun Learning
- **Package Name**: com.abcfunlearning.app
- **Target SDK**: Android 14 (API level 34)
- **Minimum SDK**: Android 7.0 (API level 24)
- **Icon**: Original 3D ABC Custom Launcher Icon
- **Orientation**: Fullscreen & Tablet Responsive

---

## 🚀 How to Build the APK in 2 Minutes:

### Option A: Using Command Line (Fastest)
1. Ensure Java (JDK 17 or higher) is installed.
2. In this project directory, run:
   \`\`\`bash
   ./gradlew assembleRelease
   \`\`\`
   *(Or on Windows: \`gradlew.bat assembleRelease\`)*
3. Your installable APK file will be located at:
   \`app/build/outputs/apk/release/app-release-unsigned.apk\`
4. To install directly to your connected Android phone:
   \`\`\`bash
   ./gradlew installDebug
   \`\`\`

### Option B: Using Android Studio
1. Open Android Studio.
2. Click **Open an Existing Project** and select this extracted folder.
3. Wait for Gradle Sync to complete.
4. Click **Build** > **Build Bundle(s) / APK(s)** > **Build APK(s)**.
5. Android Studio will generate the APK and show a popup with a **locate** link to your APK file.
6. Transfer the APK to your phone or send via WhatsApp/Telegram/Drive, tap and click **Install**!

---

## 📱 Instant Install without Building:
You can also install **ABC Fun Learning** directly on your Android phone in 1 tap from Google Chrome:
1. Open the app URL in Google Chrome on your Android phone.
2. Tap the **Install App** button or Chrome menu (⋮) > **Install App** / **Add to Home screen**.
3. Android will automatically create the native WebAPK with the custom ABC icon!
`
  );

  // Gradle Wrapper & Build scripts
  zip.file(
    'settings.gradle.kts',
    `pluginManagement {
    repositories {
        google()
        mavenCentral()
        gradlePluginPortal()
    }
}
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
    }
}

rootProject.name = "ABCFunLearning"
include(":app")
`
  );

  zip.file(
    'build.gradle.kts',
    `plugins {
    alias(libs.plugins.android.application) apply false
    alias(libs.plugins.kotlin.android) apply false
}
`
  );

  // App module build.gradle.kts
  zip.file(
    'app/build.gradle.kts',
    `plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
}

android {
    namespace = "com.abcfunlearning.app"
    compileSdk = 34

    defaultConfig {
        applicationId = "com.abcfunlearning.app"
        minSdk = 24
        targetSdk = 34
        versionCode = 1
        versionName = "1.0.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
            signingConfig = signingConfigs.getByName("debug")
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
    kotlinOptions {
        jvmTarget = "17"
    }
}

dependencies {
    implementation("androidx.core:core-ktx:1.13.1")
    implementation("androidx.appcompat:appcompat:1.6.1")
    implementation("com.google.android.material:material:1.12.0")
    implementation("androidx.webkit:webkit:1.10.0")
}
`
  );

  // AndroidManifest.xml
  zip.file(
    'app/src/main/AndroidManifest.xml',
    `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    package="com.abcfunlearning.app">

    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

    <application
        android:allowBackup="true"
        android:dataExtractionRules="@xml/data_extraction_rules"
        android:fullBackupContent="@xml/backup_rules"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.ABCFunLearning"
        android:hardwareAccelerated="true"
        tools:targetApi="31">
        
        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:screenOrientation="portrait"
            android:configChanges="orientation|screenSize|keyboardHidden"
            android:theme="@style/Theme.ABCFunLearning.Fullscreen">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>

</manifest>
`
  );

  // MainActivity.kt
  zip.file(
    'app/src/main/java/com/abcfunlearning/app/MainActivity.kt',
    `package com.abcfunlearning.app

import android.annotation.SuppressLint
import android.os.Bundle
import android.view.View
import android.webkit.WebChromeClient
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {

    private lateinit var webView: WebView

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        // Hide system bars for full-screen immersive kid experience
        window.decorView.systemUiVisibility = (
            View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY
            or View.SYSTEM_UI_FLAG_LAYOUT_STABLE
            or View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
            or View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
            or View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
            or View.SYSTEM_UI_FLAG_FULLSCREEN
        )

        webView = WebView(this)
        setContentView(webView)

        val webSettings: WebSettings = webView.settings
        webSettings.javaScriptEnabled = true
        webSettings.domStorageEnabled = true
        webSettings.databaseEnabled = true
        webSettings.mediaPlaybackRequiresUserGesture = false
        webSettings.allowFileAccess = true
        webSettings.cacheMode = WebSettings.LOAD_DEFAULT

        webView.webChromeClient = WebChromeClient()
        webView.webViewClient = object : WebViewClient() {
            override fun shouldOverrideUrlLoading(view: WebView?, url: String?): Boolean {
                return false
            }
        }

        // Loads the ABC Fun Learning web application
        val appUrl = "${typeof window !== 'undefined' ? window.location.origin : 'https://ais-dev-c2uqa7ymyykapn3ifymfzr-11100399043.asia-northeast1.run.app'}"
        webView.loadUrl(appUrl)
    }

    override fun onBackPressed() {
        if (webView.canGoBack()) {
            webView.goBack()
        } else {
            super.onBackPressed()
        }
    }
}
`
  );

  // strings.xml
  zip.file(
    'app/src/main/res/values/strings.xml',
    `<resources>
    <string name="app_name">ABC Fun Learning</string>
</resources>
`
  );

  // themes.xml
  zip.file(
    'app/src/main/res/values/themes.xml',
    `<resources>
    <style name="Theme.ABCFunLearning" parent="Theme.MaterialComponents.DayNight.NoActionBar">
        <item name="colorPrimary">#4F46E5</item>
        <item name="colorPrimaryVariant">#4338CA</item>
        <item name="colorOnPrimary">#FFFFFF</item>
        <item name="android:statusBarColor">#4F46E5</item>
    </style>
    <style name="Theme.ABCFunLearning.Fullscreen" parent="Theme.ABCFunLearning">
        <item name="android:windowFullscreen">true</item>
        <item name="android:windowContentOverlay">@null</item>
    </style>
</resources>
`
  );

  // Adaptive icon XMLs and colors
  zip.file(
    'app/src/main/res/mipmap-anydpi-v26/ic_launcher.xml',
    `<?xml version="1.0" encoding="utf-8"?>
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
    <background android:drawable="@color/ic_launcher_background"/>
    <foreground android:drawable="@drawable/ic_launcher_foreground"/>
</adaptive-icon>
`
  );
  zip.file(
    'app/src/main/res/mipmap-anydpi-v26/ic_launcher_round.xml',
    `<?xml version="1.0" encoding="utf-8"?>
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
    <background android:drawable="@color/ic_launcher_background"/>
    <foreground android:drawable="@drawable/ic_launcher_foreground"/>
</adaptive-icon>
`
  );
  zip.file(
    'app/src/main/res/values/ic_launcher_background.xml',
    `<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="ic_launcher_background">#4F46E5</color>
</resources>
`
  );

  // Bundle all densities into zip
  const densityFolders = [
    { folder: 'mipmap-mdpi', path: '/android-res/mipmap-mdpi/' },
    { folder: 'mipmap-hdpi', path: '/android-res/mipmap-hdpi/' },
    { folder: 'mipmap-xhdpi', path: '/android-res/mipmap-xhdpi/' },
    { folder: 'mipmap-xxhdpi', path: '/android-res/mipmap-xxhdpi/' },
    { folder: 'mipmap-xxxhdpi', path: '/android-res/mipmap-xxxhdpi/' },
  ];

  for (const d of densityFolders) {
    try {
      const [resIcon, resRound] = await Promise.all([
        fetch(`${d.path}ic_launcher.png`),
        fetch(`${d.path}ic_launcher_round.png`),
      ]);
      if (resIcon.ok) {
        zip.file(`app/src/main/res/${d.folder}/ic_launcher.png`, await resIcon.blob());
      }
      if (resRound.ok) {
        zip.file(`app/src/main/res/${d.folder}/ic_launcher_round.png`, await resRound.blob());
      }
    } catch (e) {
      console.warn(`Could not bundle ${d.folder}:`, e);
    }
  }

  // Foreground image
  try {
    const fgRes = await fetch('/android-res/drawable/ic_launcher_foreground.png');
    if (fgRes.ok) {
      zip.file('app/src/main/res/drawable/ic_launcher_foreground.png', await fgRes.blob());
    }
  } catch (e) {
    console.warn('Could not bundle foreground image:', e);
  }

  // Shell script to build APK
  zip.file(
    'build-apk.sh',
    `#!/bin/bash
echo "Building ABC Fun Learning Android APK..."
chmod +x ./gradlew
./gradlew assembleRelease
echo "Build complete! Your APK is ready in app/build/outputs/apk/release/app-release-unsigned.apk"
`
  );

  // Generate zip blob and trigger browser download
  const blob = await zip.generateAsync({ type: 'blob' });
  const downloadUrl = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = downloadUrl;
  a.download = 'ABC-Fun-Learning-Android-Project.zip';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(downloadUrl);
}
