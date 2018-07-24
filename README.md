React login form

# Zadanie
W ramach zadania kandydat powinien stworzyć stronę html z zaimplementowaną obsługą formularza po stronie front-end'u.

```html
<form method="POST" action="">
    <fieldset>
        <label for="email">email</label>
        <input type="text" name="email" id="email">
        <label for="password">password</label>
        <input type="password" name="password" id="password">
        <label for="remember">Remember me</label>
        <input type="checkbox" name="remember" id="remember">
      	<input type="submit" value="login">
    </fieldset>
</form>
```

## Wymagania funkcjonalne
### Wymagania walidacji
- pola email i password nie mogą być puste
- wartość wprowadzona dla pola email powinna spełniać warunki poprawnego adresu email
- wartość pola password powinna składać się co najmniej z 6 znaków (w tym co najmniej 1 dużej litery, 1 małej i jednej cyfry
)

### Wymagania integracji z serwerem
Zadanie nie wymaga integracji z serwerem. Odpowiedź od serwera ma być zamockowana i powinna przepuszczać użytkownika test@test.pl/Password1.

#### Obsługa odpowiedzi z serwera zgodnie ze specyfikacją statusów:
**Poprawne logowanie**
- wyświetlenie komunikatu: "login successful"; ukrycie formularza

**Brak autoryzacji**
- wyświetlenie komunikatu: "invalid email or password"

**Niepoprawne dane w inputach** (z wymagań walidacji)
- wyświetlenie komunikatu: "invalid email" / "invalid password"


#### wygląd formularza
- Formularz powinien być estetycznie zaprojektowany wykorzystując do tego możliwości HTML5/CSS3 bez użycia bibliotek typu Bootstrap/Materialize,
- Formularz powinien dobrze wyglądać na różnych urządzeniach mobile/tablet/desktop,

## Wymagania niefunkcjonalne
- Zadanie powinno być wykonane z użyciem jednego z popularnych frameworków np. React/Backbone/Angular 2,
- Zgodność ze standardem ~ECMASCRIPT 2015, HTML5, CSS3,
- Kodowanie UTF8,
- Wspierane przeglądarki IE10+, Firefox, Chrome (2 ostatnie stabilne wersje),
- Testy jednostkowe dla dostarczonej implementacji,
- Implementacja części serwerowej nie jest w zakresie powyższego zadania
