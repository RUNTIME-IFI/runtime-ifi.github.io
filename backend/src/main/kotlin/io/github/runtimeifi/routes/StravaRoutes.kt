package io.github.runtimeifi.routes

import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import io.ktor.client.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*

// Strava Club endpoints: info, leaderboard, members, admins
// read more about the endpoints here: https://developers.strava.com/docs/reference/#api-Clubs 
fun Route.stravaRoutes() {
    val client = HttpClient()
    val clubId = 1766412 // hardcoded Strava club ID
    val accessToken = System.getenv("STRAVA_ACCESS_TOKEN")

    route("/api/strava") {

        // Returns club info
        get("/info") {
            val response: String = client.get("https://www.strava.com/api/v3/clubs/$clubId") {
                headers { append("Authorization", "Bearer $accessToken") }
            }.bodyAsText()
            call.respondText(response, ContentType.Application.Json)
        }

        // Returns recent activities (leaderboard)
        get("/leaderboard") {
            val response: String = client.get("https://www.strava.com/api/v3/clubs/$clubId/activities") {
                headers { append("Authorization", "Bearer $accessToken") }
            }.bodyAsText()
            call.respondText(response, ContentType.Application.Json)
        }

        // Returns list of members
        get("/members") {
            val response: String = client.get("https://www.strava.com/api/v3/clubs/$clubId/members") {
                headers { append("Authorization", "Bearer $accessToken") }
            }.bodyAsText()
            call.respondText(response, ContentType.Application.Json)
        }

        // Returns list of admins
        get("/admins") {
            val response: String = client.get("https://www.strava.com/api/v3/clubs/$clubId/admins") {
                headers { append("Authorization", "Bearer $accessToken") }
            }.bodyAsText()
            call.respondText(response, ContentType.Application.Json)
        }
    }
}
