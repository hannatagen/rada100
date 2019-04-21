package com.example.ekm.DTO;/* Created by Hanna on 19-Apr-19.*/

import com.sun.org.apache.xpath.internal.operations.Bool;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.hateoas.ResourceSupport;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class LanguageInputDTO extends ResourceSupport {
    @NotNull
    @NotEmpty
    String name;
    @NotNull
    @NotEmpty
    String lang;
    String translation;
    @NotNull
    @NotEmpty
    String component;
    @NotNull
    @NotEmpty
    Boolean textarea;
    
    public String getName() {
        return name;
    }
    
    public String getLang() {
        return lang;
    }
    
    public String getTranslation() {
        return translation;
    }
    
    public String getComponent() {
        return component;
    }
    
    public Boolean getTextarea() {
        return textarea;
    }
}
