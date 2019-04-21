package com.example.ekm.DTO;/* Created by Hanna on 19-Apr-19.*/

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.hateoas.ResourceSupport;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class LanguageOutputDTO extends ResourceSupport {
    Long langId;
    String name;
    String lang;
    String translation;
    String component;
    Boolean textarea;
}
