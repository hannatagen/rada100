package com.example.ekm.Controller;/* Created by Hanna on 19-Apr-19.*/

import com.example.ekm.Assembler.LanguageAssembler;
import com.example.ekm.DTO.LanguageInputDTO;
import com.example.ekm.DTO.LanguageOutputDTO;
import com.example.ekm.Model.Language;
import com.example.ekm.Repository.LanguageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@SuppressWarnings("ALL")
@RestController
@RequestMapping("/api/language")
public class LanguageController {
    @Autowired
    LanguageRepository languageRepository;
    @Autowired
    LanguageAssembler languageAssembler;
    
    @GetMapping("/")
    public @ResponseBody
    List<LanguageOutputDTO> getTranslations() {
        List<Language> translations = languageRepository.findAll();
        return languageAssembler.toResources(translations);
    }
    
    @PostMapping("/")
    public long addTranslation(@RequestBody LanguageInputDTO languageInputDTO) {
        Language translation = new Language();
        translation.setName(languageInputDTO.getName());
        translation.setLang(languageInputDTO.getLang());
        translation.setTranslation(languageInputDTO.getTranslation());
        translation.setComponent(languageInputDTO.getComponent());
        translation.setTextarea(languageInputDTO.getTextarea());
        languageRepository.saveAndFlush(translation);
        return translation.getId();
    }
    
    @PostMapping("/update/{id}")
    public long updateTranslation(@PathVariable long id, @RequestBody LanguageInputDTO languageInputDTO) {
        languageRepository.deleteById(id);
        
        Language translation = new Language();
        translation.setName(languageInputDTO.getName());
        translation.setLang(languageInputDTO.getLang());
        translation.setTranslation(languageInputDTO.getTranslation());
        translation.setComponent(languageInputDTO.getComponent());
        translation.setTextarea(languageInputDTO.getTextarea());
        languageRepository.saveAndFlush(translation);
        return translation.getId();
    }
}
