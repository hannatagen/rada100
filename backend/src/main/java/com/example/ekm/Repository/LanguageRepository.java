package com.example.ekm.Repository;/* Created by Hanna on 19-Apr-19.*/

import com.example.ekm.Model.Language;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LanguageRepository extends JpaRepository<Language, Long> {
    @Override
    List<Language> findAll();
}
