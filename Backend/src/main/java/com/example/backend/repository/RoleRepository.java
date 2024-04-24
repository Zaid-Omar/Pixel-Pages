package com.example.backend.repository;

import com.example.backend.UserRole;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Transactional
@Repository
public interface RoleRepository extends JpaRepository<UserRole, Long>
{
    @Query("SELECT CASE WHEN COUNT(ur) > 0 THEN TRUE ELSE FALSE END FROM UserRole ur WHERE ur.user = :userId")
    boolean existsByUserId(@Param("userId") Long userId);

}
