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
    
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public Trail getTrail() {
        return trail;
    }
    
    public void setTrail(Trail trail) {
        this.trail = trail;
    }
    
    public Point getPoint() {
        return point;
    }
    
    public void setPoint(Point point) {
        this.point = point;
    }
    
    public GameUser getGameUser() {
        return gameUser;
    }
    
    public void setGameUser(GameUser gameUser) {
        this.gameUser = gameUser;
    }
    
    public Boolean getVisited() {
        return visited;
    }
    
    public void setVisited(Boolean visited) {
        this.visited = visited;
    }
}
