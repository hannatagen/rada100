package com.example.ekm.Model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Data
public class Point {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    long id;
    Trail trail_id;
    String name;
    String description;
    String lon;
    String lat;
}
