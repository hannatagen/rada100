package com.example.ekm.Service;

import com.example.ekm.Model.GameUser;
import com.example.ekm.Repository.GameUserRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import static java.util.Collections.emptyList;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    private GameUserRepository gameUserRepository;

    public UserDetailsServiceImpl(GameUserRepository gameUserRepository) {
        this.gameUserRepository = gameUserRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        GameUser gameUser = gameUserRepository.findByUsername(username);
        if (gameUser == null) {
            throw new UsernameNotFoundException(username);
        }
        return new User(gameUser.getUsername(), gameUser.getPassword(), emptyList());
    }
}