package com.example.ekm.Security;

import com.example.ekm.Model.GameUser;
import com.example.ekm.Repository.GameUserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import static com.example.ekm.Security.SecurityConstants.*;

public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private AuthenticationManager authenticationManager;
    private GameUserRepository gameUserRepository;

    public JWTAuthenticationFilter(AuthenticationManager authenticationManager, GameUserRepository gameUserRepository) {
        this.authenticationManager = authenticationManager;
        this.gameUserRepository = gameUserRepository;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest req,
                                                HttpServletResponse res) throws AuthenticationException {
        try {
            GameUser creds = new ObjectMapper()
                    .readValue(req.getInputStream(), GameUser.class);

            GameUser applicationUser = gameUserRepository.findByUsername(creds.getUsername());
            List<GrantedAuthority> authorities = new ArrayList<>();
            if (applicationUser != null) {
                GrantedAuthority grantedAuthority = new SimpleGrantedAuthority(applicationUser.getRole().name());
                authorities.add(grantedAuthority);
            }

            return authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            creds.getUsername(),
                            creds.getPassword(),
                            authorities)
            );
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest req,
                                            HttpServletResponse res,
                                            FilterChain chain,
                                            Authentication auth) {
        String authority = auth.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.joining(","));
        String token = Jwts.builder()
                .setSubject(((User) auth.getPrincipal()).getUsername())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS512, SECRET)
                .claim(AUTHORITIES_KEY, authority)
                .compact();
        res.addHeader(HEADER_STRING, TOKEN_PREFIX + token);
    }
}
