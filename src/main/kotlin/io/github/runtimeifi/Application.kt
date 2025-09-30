package io.github.runtimeifi

import io.ktor.server.engine.*
import io.ktor.server.netty.*
import io.ktor.server.routing.*
import io.github.runtimeifi.routes.stravaRoutes

fun main() {
    embeddedServer(Netty, port = 8080) {
        routing {
            stravaRoutes()
        }
    }.start(wait = true)
}
