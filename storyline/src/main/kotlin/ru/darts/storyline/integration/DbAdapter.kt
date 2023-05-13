package ru.darts.storyline.integration

import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import org.springframework.web.client.RestTemplate


@Service
class DbAdapter(private val dbClient: RestTemplate) {
    @Value("\${dbClient.url:http://127.0.0.1:5000}")
    private lateinit var baseUrl: String
    private val LOG: Logger = LoggerFactory.getLogger(DbAdapter::class.java)
    private val INTEGRATION_ERROR_TEXT: String = "DbAdapter Integration ERROR"


    fun getEvent(longreadId: String, chapterId: String, blockContentId: String): String {
        LOG.info("getEvent: $longreadId, $chapterId, $blockContentId ; dbClientUrl = $baseUrl")

        return sendRequest()
    }

    fun getLongreadMap(longreadId: String): String {
        LOG.info("getLongreadMap: $longreadId ; dbClientUrl = $baseUrl")

        return sendRequest()
    }

    fun getLongreadEvents(chapterId: String): String  {
        LOG.info("getLongreadEvents: $chapterId ; dbClientUrl = $baseUrl")

        return sendRequest()
    }




    private inline fun <reified T> sendRequest(url: String, request: Any?, responseType: T) : T {
        requireNotNull(responseType)
        LOG.info("Sending request on $url")
        val response = dbClient.postForEntity(url, request, responseType!!::class.java)
        if (response.statusCode.is2xxSuccessful) {
            requireNotNull(response.body)
            LOG.info("Got response: ${response.body}")
            return response.body!!
        }

        LOG.error(INTEGRATION_ERROR_TEXT, "response: $response")
        throw IntegrationException(INTEGRATION_ERROR_TEXT)
    }
}