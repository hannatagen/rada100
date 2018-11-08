package com.example.ekm.Model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class Point {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    long id;
    @JoinColumn(name = "trail")
    @ManyToOne(fetch = FetchType.LAZY)
    Trail trail_id;
    String name;
    String description;
    String lon;
    String lat;
}
