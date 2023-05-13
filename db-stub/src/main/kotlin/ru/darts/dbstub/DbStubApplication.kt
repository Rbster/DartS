package ru.darts.dbstub

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class DbStubApplication

fun main(args: Array<String>) {
	runApplication<DbStubApplication>(*args)
}
