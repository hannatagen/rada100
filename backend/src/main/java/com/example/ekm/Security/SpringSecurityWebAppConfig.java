package com.example.ekm.Security;

import com.example.ekm.Repository.GameUserRepository;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.annotation.Resource;

@EnableWebSecurity
public class SpringSecurityWebAppConfig extends WebSecurityConfigurerAdapter {

    private UserDetailsService userDetailsService;
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Resource
    private GameUserRepository gameUserRepository;

    public SpringSecurityWebAppConfig(@Qualifier("userDetailsServiceImpl") UserDetailsService userDetailsService,
                                      BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userDetailsService = userDetailsService;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable().authorizeRequests()
                .antMatchers(HttpMethod.GET, "/api/games/").hasAnyAuthority("PLAYER", "ADMIN")
                .antMatchers(HttpMethod.POST, "/api/games/point/{point_id}").hasAnyAuthority("PLAYER", "ADMIN")
                .antMatchers(HttpMethod.GET, "/api/games/point/{point_id}").hasAnyAuthority("PLAYER", "ADMIN")
                .antMatchers(HttpMethod.POST, "/api/games/{trail_id}").hasAnyAuthority("PLAYER", "ADMIN")
                .antMatchers(HttpMethod.GET, "/api/games/{trail_id}").hasAnyAuthority("PLAYER", "ADMIN")
                .antMatchers(HttpMethod.GET, "/api/games/{trail_id}/started").hasAnyAuthority("PLAYER", "ADMIN")
                .antMatchers(HttpMethod.GET, "/api/games/{trail_id}/ended").hasAnyAuthority("PLAYER", "ADMIN")
                .antMatchers(HttpMethod.GET, "/api/users/").hasAnyAuthority("ADMIN")
                .antMatchers(HttpMethod.GET, "/api/users/information").hasAnyAuthority("PLAYER", "ADMIN")
                .antMatchers(HttpMethod.POST, "/api/points/").hasAnyAuthority("ADMIN")
                .antMatchers(HttpMethod.POST, "/api/trails/").hasAnyAuthority("ADMIN")
                .anyRequest().permitAll()
                .and()
                .addFilter(new JWTAuthenticationFilter(authenticationManager(), gameUserRepository))
                .addFilter(new JWTAuthorizationFilter(authenticationManager(), gameUserRepository));
    }

    @Override
    public void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(bCryptPasswordEncoder);
    }
}
