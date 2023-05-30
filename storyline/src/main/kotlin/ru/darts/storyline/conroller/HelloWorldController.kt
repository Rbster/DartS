package ru.darts.storyline.conroller

import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.*
import org.springframework.web.bind.annotation.*
import ru.darts.storyline.EventData
import ru.darts.storyline.integration.DbAdapter
import java.lang.Exception

@RestController
@RequestMapping("/api")
class HelloWorldController {
    @Autowired
    lateinit var dbAdapter: DbAdapter

    private val log = LoggerFactory.getLogger(HelloWorldController::class.java)

    @GetMapping("/hello")
    fun hello() : String {
        log.warn("get yo there!")
        return "hella hi!"
    }

    @GetMapping("/events/{longreadId}")
    fun events(@PathVariable longreadId: Long) : ResponseEntity<String> {
        log.debug("Controller.events of longreadId = $longreadId")
        val responseHeaders = HttpHeaders().apply { contentType = MediaType.APPLICATION_JSON }
        return try {
            val result = dbAdapter.getLongreadEvents(longreadId)
            ResponseEntity<String>(result, responseHeaders, HttpStatus.OK)
        } catch (_: Exception) {
            ResponseEntity<String>(HttpStatus.NOT_FOUND)
        }
    }

    @PostMapping("/event/edit/{longreadId}")
    fun editEvent(@PathVariable longreadId: Long, @RequestBody eventData: EventData) = try {
            log.debug("Controller.events of longreadId = $longreadId")
            dbAdapter.updateEventOfBlockContent(longreadId, eventData)
            ResponseEntity<String>(HttpStatus.CREATED)
        } catch (_: IllegalStateException) {
            ResponseEntity<String>(HttpStatus.BAD_REQUEST)
        } catch (_: Exception) {
            ResponseEntity<String>(HttpStatus.NOT_FOUND)
        }
    
}