package com.lms.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/test")
public class TestController {

    @GetMapping("/cors")
    public ResponseEntity<Map<String, String>> testCors() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "CORS is working!");
        response.put("status", "success");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/cors")
    public ResponseEntity<Map<String, String>> testCorsPost(@RequestBody(required = false) Map<String, Object> body) {
        Map<String, String> response = new HashMap<>();
        response.put("message", "CORS POST is working!");
        response.put("status", "success");
        response.put("received", body != null ? body.toString() : "no body");
        return ResponseEntity.ok(response);
    }
}