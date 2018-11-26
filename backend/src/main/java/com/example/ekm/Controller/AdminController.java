package com.example.ekm.Controller;

import com.example.ekm.DTO.GameUserInputDTO;
import com.example.ekm.Model.GameUser;
import com.example.ekm.Model.UserRole;
import com.example.ekm.Repository.GameUserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private GameUserRepository gameUserRepository;
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public AdminController(GameUserRepository gameUserRepository,
                          BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.gameUserRepository = gameUserRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @PostMapping("/register")
    public void signUp(@RequestBody GameUserInputDTO user) {
        GameUser gameUser = new GameUser();
        gameUser.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        gameUser.setRole(UserRole.ADMIN);
        gameUser.setEmail(user.getEmail());
        gameUser.setUsername(user.getUsername());
        gameUserRepository.saveAndFlush(gameUser);
    }
}
