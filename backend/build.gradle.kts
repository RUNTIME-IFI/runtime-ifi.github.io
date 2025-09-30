plugins {
    kotlin("jvm") version "2.2.0"
    application
    kotlin("plugin.serialization") version "1.9.10"
}

group = "io.github.runtimeifi"
version = "1.0-SNAPSHOT"

application {
    mainClass.set("io.github.runtimeifi.ApplicationKt")
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("io.ktor:ktor-server-core:2.3.5")
    implementation("io.ktor:ktor-server-netty:2.3.5")
    
    implementation("io.ktor:ktor-client-core:2.3.5")
    implementation("io.ktor:ktor-client-cio:2.3.5")
    
    implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:1.6.0")
    
    implementation("ch.qos.logback:logback-classic:1.4.11")
    
    testImplementation(kotlin("test"))
    testImplementation("io.ktor:ktor-server-tests:2.3.5")
}

tasks.test {
    useJUnitPlatform()
}
