package com.example.ekm.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Game {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;
    @JoinColumn(name = "trail")
    @ManyToOne
    Trail trail;
    @JoinColumn(name = "point")
    @ManyToOne
    Point point;
    @JoinColumn(name = "game_user")
    @ManyToOne
    GameUser gameUser;
    Boolean visited;
}
