# Source 
# WEB 
Points : 100

## Description
Don't know source is helpful or not !!
http://web.darkarmy.xyz

## Attachments
 > [index.php](https://raw.githubusercontent.com/lightningsarp/CTF-Players/master/DARKCTF/files/flag.PNG)

## Solution
The provided URL links to this page.

![page](https://raw.githubusercontent.com/lightningsarp/CTF-Players/master/DARKCTF/files/page.PNG)

In the provided source code there is a small php code.

```php
$web = $_SERVER['HTTP_USER_AGENT'];
if (is_numeric($web)){
      if (strlen($web) < 4){
          if ($web > 10000){
                 echo ('<div class="w3-panel w3-green"><h3>Correct</h3><p>darkCTF{}</p></div>');
          } else {
                 echo ('<div class="w3-panel w3-red"><h3>Wrong!</h3> <p>Ohhhhh!!! Very Close  </p></div>');
          }
      } else {
             echo ('<div class="w3-panel w3-red"><h3>Wrong!</h3><p>Nice!!! Near But Far</p></div>');
      }
} else {
    echo ('<div class="w3-panel w3-red"><h3>Wrong!</h3><p>Ahhhhh!!! Try Not Easy</p></div>');
}
?>
```

The code checks the user agent against three conditions:
* If it's numeric
* If its length is less than 4
* If its value is greater than 10000

At first i didn't know what value could meet these conditions simultaneously, because of course there's no way
that a number is greater than 10000 and its length is less than 4 at the same time.
But then i remembered that PHP allows numbers to be written in scientific notation (ie. 5e10) so i changed my user agent to `9e5`
which is numeric, its length is 3 and its value is 900000.
I reloaded the page and got the flag.

![flag](https://github.com/SamIsland/DarkCTF2020/blob/master/source/flag.PNG)
`darkCTF{changeing_http_user_agent_is_easy}`
