package com.zjservice.common.utils;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.util.HashMap;
import java.util.Map;

/**
 * @author zj
 * @date 2019/12/25 16:43
 * @Description token生成与校验方法
 */
public class JwtUtil {

    private static final String SECRET = "qazwsx123444$#%#()*&& asdaswwi1235 ?;!@#kmmmpom in***xx**&";
    private static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_AUTH = "Token";

    /**
     * 生成token
     */
    public static String generateToken(String userName, String password) {
        HashMap<String, Object> map = new HashMap<>(2);
        map.put("userName", userName);
        map.put("password", password);
        String jwt = Jwts.builder()
                .setSubject("user info").setClaims(map)
                .signWith(SignatureAlgorithm.HS512, SECRET)
                .compact();
        return TOKEN_PREFIX + jwt;
    }

    /**
     * token 数据查询
     */
    public static Map<String, String> validateToken(String token) {
        if (token != null) {
            HashMap<String, String> map = new HashMap<>(2);
            Map<String, Object> body = Jwts.parser()
                    .setSigningKey(SECRET)
                    .parseClaimsJws(token.replace(TOKEN_PREFIX, ""))
                    .getBody();
            String userName = (String) (body.get("userName"));
            String password = (String) (body.get("password"));
            map.put("userName", userName);
            map.put("password", password);
            return map;
        } else {
            return null;
        }
    }

}
