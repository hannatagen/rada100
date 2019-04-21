package com.example.ekm.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class PointInputDTO {
    Long trailId;
    String name;
    String description;
    String longitude;
    String latitude;
    String link;
    
    public Long getTrailId() {
        return trailId;
    }
    
    public String getName() {
        return name;
    }
    
    public String getDescription() {
        return description;
    }
    
    public String getLongitude() {
        return longitude;
    }
    
    public String getLatitude() {
        return latitude;
    }
    
    public String getLink() {
        return link;
    }
}
