package ru.darts.storyline.conroller

import org.slf4j.LoggerFactory
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class HelloWorldController {
    private val log = LoggerFactory.getLogger(HelloWorldController::class.java)

    @GetMapping("/hello")
    fun hello() : String {
        log.warn("get yo there!")
        return "hella hi!"
    }
}