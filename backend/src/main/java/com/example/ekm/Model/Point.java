package com.example.ekm.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Point {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;
    @JoinColumn(name = "trail")
    @ManyToOne
    Trail trail;
    String name;
    String description;
    String longitude;
    String latitude;
    String link;
}
