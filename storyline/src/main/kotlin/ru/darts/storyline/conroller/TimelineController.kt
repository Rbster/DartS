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
class TimelineController {
    @Autowired
    lateinit var dbAdapter: DbAdapter

    private val log = LoggerFactory.getLogger(TimelineController::class.java)

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

    @GetMapping("/event/{blockContentId}")
    fun event(@PathVariable blockContentId: Long) : ResponseEntity<String> {
        log.debug("Controller.event of blockContentId = $blockContentId")
        val responseHeaders = HttpHeaders().apply { contentType = MediaType.APPLICATION_JSON }
        return try {
            val result = dbAdapter.getEvent(blockContentId)
            ResponseEntity<String>(result, responseHeaders, HttpStatus.OK)
        } catch (_: Exception) {
            ResponseEntity<String>(HttpStatus.NOT_FOUND)
        }
    }

    @PostMapping("/event/edit/{blockContentId}")
    fun editEvent(@PathVariable blockContentId: Long, @RequestBody eventData: EventData) = try {
            log.debug("Controller.editEvent of blockContentId = $blockContentId")
            dbAdapter.updateEventOfBlockContent(blockContentId, eventData)
            ResponseEntity<String>(HttpStatus.CREATED)
        } catch (_: IllegalStateException) {
            ResponseEntity<String>(HttpStatus.BAD_REQUEST)
        } catch (_: Exception) {
            ResponseEntity<String>(HttpStatus.NOT_FOUND)
        }

    @DeleteMapping("/event/delete/{blockContentId}")
    fun deleteEvent(@PathVariable blockContentId: Long) = try {
            log.debug("Controller.deleteEvent of blockContentId = $blockContentId")
            dbAdapter.deleteEventOfBlockContent(blockContentId)
            ResponseEntity<String>(HttpStatus.NO_CONTENT)
        } catch (_: IllegalStateException) {
            ResponseEntity<String>(HttpStatus.BAD_REQUEST)
        } catch (_: Exception) {
            ResponseEntity<String>(HttpStatus.NOT_FOUND)
        }
}