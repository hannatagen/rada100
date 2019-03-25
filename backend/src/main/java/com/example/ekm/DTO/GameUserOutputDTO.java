package com.example.ekm.DTO;

import com.example.ekm.Model.UserRole;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.hateoas.ResourceSupport;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class GameUserOutputDTO extends ResourceSupport {
    private Long userId;
    private String username;
    private String email;
    private UserRole role;
}
