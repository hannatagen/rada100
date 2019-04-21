package com.example.ekm.Assembler;/* Created by Hanna on 19-Apr-19.*/

import com.example.ekm.Controller.LanguageController;
import com.example.ekm.DTO.LanguageOutputDTO;
import com.example.ekm.Model.Language;
import org.springframework.hateoas.mvc.ResourceAssemblerSupport;
import org.springframework.stereotype.Service;

@Service
public class LanguageAssembler extends ResourceAssemblerSupport<Language, LanguageOutputDTO> {
    public LanguageAssembler() {
        super(LanguageController.class, LanguageOutputDTO.class);
    }
    
    @Override
    public LanguageOutputDTO toResource(Language language) {
        return LanguageOutputDTO.builder()
                .langId(language.getId())
                .name(language.getName())
                .lang(language.getLang())
                .translation(language.getTranslation())
                .component(language.getComponent())
                .textarea(language.getTextarea())
                .build();
    }
}
