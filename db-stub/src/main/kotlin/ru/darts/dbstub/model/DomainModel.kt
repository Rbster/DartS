package ru.darts.dbstub.model

import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id


@Entity()
class ContentBlock() {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private val id: Long = 0
}