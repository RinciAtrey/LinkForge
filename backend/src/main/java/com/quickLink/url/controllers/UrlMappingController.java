package com.quickLink.url.controllers;

import com.quickLink.url.dto.ClickEventDTO;
import com.quickLink.url.dto.UrlMappingDTO;
import com.quickLink.url.models.User;
import com.quickLink.url.service.UrlMappingService;
import com.quickLink.url.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/urls")
@AllArgsConstructor
public class UrlMappingController {
       private UrlMappingService urlMappingService;
       private UserService userService;

       //{"originalUrl": "http://example.com"}
       @PostMapping("/shorten")
       @PreAuthorize("hasRole('USER')")
       public ResponseEntity<UrlMappingDTO> createShortUrl(@RequestBody Map<String,String> request,
                                                           Principal principal){

           String originalUrl= request.get("originalUrl");
           User user=userService.findByUsername(principal.getName());
           //call service
           UrlMappingDTO urlMappingDTO= urlMappingService.createShortUrl(originalUrl,user);
           return ResponseEntity.ok(urlMappingDTO);

       }

       @GetMapping("/myurls")
       @PreAuthorize("hasRole('USER')")
       public ResponseEntity<List<UrlMappingDTO>> getUserUrls(Principal principal){
           User user= userService.findByUsername(principal.getName());
           List<UrlMappingDTO> urls =urlMappingService.getUrlsByUser(user);
           return ResponseEntity.ok(urls);

       }

       @GetMapping("/analytics/{shortUrl}")
       @PreAuthorize("hasRole('USER')")
       public ResponseEntity<List<ClickEventDTO>> getUrlAnalytics(
               @PathVariable String shortUrl,
               @RequestParam("startDate") String startDate,
               @RequestParam("endDate") String endDate
       ){
           DateTimeFormatter formatter=DateTimeFormatter.ISO_DATE_TIME;   // 2024-12-01T00:00:00
           LocalDateTime start= LocalDateTime.parse(startDate, formatter);  //convert
           LocalDateTime end= LocalDateTime.parse(endDate, formatter);
           List<ClickEventDTO> clickEventDTOS=urlMappingService.getClickEventsByDate(shortUrl, start, end);
           return ResponseEntity.ok(clickEventDTOS);
       }

    @GetMapping("/totalClicks")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Map<LocalDate, Long>> getTotalClicksByDate(Principal principal,
                                                                     @RequestParam("startDate") String startDate,
                                                                     @RequestParam("endDate") String endDate){
        DateTimeFormatter formatter=DateTimeFormatter.ISO_LOCAL_DATE;   // 2024-12-01T00:00:00
        User user=userService.findByUsername(principal.getName());
        LocalDate start= LocalDate.parse(startDate, formatter);  //convert
        LocalDate end= LocalDate.parse(endDate, formatter);
        Map<LocalDate, Long> totalClicks =urlMappingService.getTotalClicksByUserAndDate(user, start, end);
        return ResponseEntity.ok(totalClicks);

    }

    @DeleteMapping("/{shortUrl}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Void> deleteShortUrl(@PathVariable String shortUrl, Principal principal) {
        String username = principal.getName();
        boolean deleted = urlMappingService.deleteByShortUrlForUser(shortUrl, username);
        if (deleted) {
            return ResponseEntity.noContent().build(); // 204
        } else {
            return ResponseEntity.status(404).build(); // not found or not allowed
        }
    }


}











