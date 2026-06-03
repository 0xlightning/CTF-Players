/**
 * CTF-Players Data File
 * Contains all CTF event metadata and writeup content.
 * No fetch() needed — content is embedded directly.
 */

// ──────────────────────────────────────────────
// CTF Catalog: Event metadata & challenge definitions
// ──────────────────────────────────────────────
const CTF_CATALOG = {
  "damctf": {
    name: "DAM CTF 2020",
    year: 2020,
    url: "https://ctftime.org/team/135396",
    challenges: [
      { key: "rules", name: "Rules", category: "Misc", points: 100, solved: true, flag: "dam{rul3s_ar3_t00_c00l_f0r_sk00l}" }
    ]
  },
  "darkctf": {
    name: "DARK CTF 2020",
    year: 2020,
    url: "https://ctftime.org/team/134537",
    challenges: [
      { key: "source", name: "Source", category: "Web", points: 100, solved: true, flag: "darkCTF{changeing_http_user_agent_is_easy}" }
    ]
  },
  "downunder": {
    name: "DownUnder CTF 2020",
    year: 2020,
    url: "https://ctftime.org/team/133160",
    challenges: [
      { key: "leggos", name: "Leggos", category: "Web", points: 100, solved: true, flag: "DUCTF{n0_k37chup_ju57_54uc3_r4w_54uc3_9873984579843}" },
      { key: "welcome", name: "Welcome", category: "Misc", points: 100, solved: true, flag: "DUCTF{w3lc0m3_t0_DUCTF_h4v3_fun!}" },
      { key: "homeruns", name: "16 Home Runs", category: "Misc", points: 100, solved: true, flag: "DUCTF{16_h0m3_run5_m34n5_runn1n6_p457_64_b4535}" },
      { key: "timtams", name: "Tim Tams", category: "Misc", points: 273, solved: true, flag: "DUTCF{HUMBLE_M3M3_1ORD}" },
      { key: "discord", name: "Discord", category: "Misc", points: 10, solved: true, flag: "DUCTF{c0n6r475_y0u_h4v3_n0w_j01n3d_0ur_4m4z1n6_d15c0rd}" },
      { key: "twitter", name: "Twitter", category: "Misc", points: 10, solved: true, flag: "DUCTF{https://www.youtube.com/watch?v=XfR9iY5y94s}" },
      { key: "spectrum", name: "On the spectrum", category: "Forensics", points: 100, solved: true, flag: "DUCTF{m4bye_n0t_s0_h1dd3n}" }
    ]
  },
  "syskron": {
    name: "Syskron Cyber Security CTF 2020",
    year: 2020,
    url: "https://ctf2020.syskron-security.com/",
    challenges: [
      { key: "welcome-letter", name: "Welcome Letter", category: "Welcome", points: 20, solved: true, flag: "syskronCTF{th4nk-you}" },
      { key: "security-headers", name: "Security headers", category: "Monday", points: 100, solved: true, flag: "syskronCTF{y0u-f0und-a-header-flag}" },
      { key: "redacted-news", name: "Redacted news", category: "Monday", points: 100, solved: true, flag: "syskronCTF{d0-Y0u-UNdEr5TaND-C2eCh?}" },
      { key: "dos-attack", name: "DOS Attack", category: "Monday", points: 100, solved: true, flag: "syskronCTF{amplified_dns_queries}" },
      { key: "change", name: "Change", category: "Tuesday", points: 200, solved: true, flag: "syskronCTF{config_updates_need_audits}" },
      { key: "leak-audit", name: "Leak audit", category: "Tuesday", points: 200, solved: true, flag: "syskronCTF{data_leaks_are_dangerous}" },
      { key: "key-generator", name: "Key generator", category: "Wednesday", points: 300, solved: true, flag: "syskronCTF{reverse_engineer_the_license}" }
    ]
  }
};

// ──────────────────────────────────────────────
// Writeup Content: Markdown strings keyed by "ctfKey/challengeKey"
// Image paths use assets/images/<ctf>/ prefix
// ──────────────────────────────────────────────
const WRITEUP_CONTENT = {

  // ── DAM CTF ──────────────────────────────────
  "damctf/rules": `# WRITEUP 2020 [team](https://ctftime.org/team/135396)

## MISC
### rules
Points : 100

#### Description
> Welcome to DamCTF! Make sure to read the rules

### Solution

In Rules section nothing intresting in it, but i saw file And I starting reading deaper into it.
On the Rules section I got two flag .So, I tested it manually and i won this challenge.

![image](assets/images/damctf/screenshot-rules.png)

[file](assets/images/damctf/rules-details.pdf)

Flag : dam{rul3s_ar3_t00_c00l_f0r_sk00l}`,

  // ── DARK CTF ─────────────────────────────────
  "darkctf/source": `# WRITEUP 2020 [TEAM](https://ctftime.org/team/134537)
# WEB

## Source
Points : 100

## Description

>Don't know source is helpful or not !!

>http://web.darkarmy.xyz

## Attachments
> [index.php](assets/images/darkctf/index.html)

## Solution
The provided URL links to this page.

![page](assets/images/darkctf/page.png)

In the provided source code there is a small php code.

\`\`\`php
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
\`\`\`

>The code checks the user agent against three conditions:
>* If it's numeric
>* If its length is less than 4
>* If its value is greater than 10000
>
>At first i didn't know what value could meet these conditions simultaneously, because of course there's no way
>that a number is greater than 10000 and its length is less than 4 at the same time.
>But then i remembered that PHP allows numbers to be written in scientific notation (ie. 5e10) so i changed my user agent to \`9e5\`
>which is numeric, its length is 3 and its value is 900000.
>I reloaded the page and got the flag.

![flag](assets/images/darkctf/flag.png)

>Flag : darkCTF{changeing_http_user_agent_is_easy}`,

  // ── DownUnder CTF ────────────────────────────
  "downunder/leggos": `# OUR FIRST WRITEUP :?
## [TEAM](https://ctftime.org/team/133160)

# Web
## Leggos
Points: 100

#### Description
>I <3 Pasta! I won't tell you what my special secret sauce is though!
>
>https://chal.duc.tf:30101

### Solution
We are prompted with a page containing some text and an image. Trying to view the source HTML we notice that we can't do a Right Click.

![image](assets/images/downunder/web.png)

No problem, we append in the URL \`view-source:\`, so it becomes \`view-source:https://chal.duc.tf:30101/\`. Inside the HTML we have a hint saying \`<!-- almost there -->\`. We open the source code of an imported JS file and we get the flag.

![image](assets/images/downunder/web2.png)

Flag: DUCTF{n0_k37chup_ju57_54uc3_r4w_54uc3_9873984579843}`,

  "downunder/welcome": `# Misc
## Welcome
Points: 100

#### Description
>Welcome to DUCTF!
>
>ssh ductf@chal.duc.tf -p 30301
>
>Password: ductf

### Solution
When you connect to the machine a bounch of messages are displayed and you can not execute any command. I tried to \`scp\` the whole home directory, but the script that displayed the messages on ssh connection was throwing some error. Looking more closely, the flag is displayed among the other messages.

![image](assets/images/downunder/welcome.png)

Flag: DUCTF{w3lc0m3_t0_DUCTF_h4v3_fun!}`,

  "downunder/homeruns": `# Misc
## 16 Home Runs
Points: 100

#### Description
>How does this string relate to baseball in anyway? What even is baseball? And how does this relate to Cyber Security? ¯(ツ)/¯
>
>\`RFVDVEZ7MTZfaDBtM19ydW41X20zNG41X3J1bm4xbjZfcDQ1N182NF9iNDUzNX0=\`

### Solution
I have no idea about baseball, but I know that the string looks like encoding and it's not base 16 (hex). Base64 deconding it gives us the flag.

![image](assets/images/downunder/homeruns.png)

Flag: DUCTF{16_h0m3_run5_m34n5_runn1n6_p457_64_b4535}`,

  "downunder/timtams": `# Misc
## Tim Tams
Points : 273

#### Description

\`\`\`
When I eat too many Tim Tams, I get rather slow!

WARNING You will want to turn down your audio for this one!

Download: https://storage.googleapis.com/files.duc.tf/uploads/Clive.wav

File Hash (SHA256): 4C1CC12D002956A83E168CA650B776B55AAC36F2131D0DF617BE7D55DBEF93D1
\`\`\`

### SOLUTION

We are given a really noisy wav audio file, I had no clue of solving this at first when my regular audio steganography tools failed. But my teammate came into play with a really good suggestion. **QSSTV !**

https://storage.googleapis.com/files.duc.tf/uploads/Clive.wav

**QSSTV** is a utility for dealing with slow scan television signals. From the challenge description, we can pick out a hint "When I eat too many Tim Tams, I get rather slow!".

I used the following commands to setup qsstv on linux

\`\`\`
sudo apt-get install pavucontrol
sudo apt-get install qsstv
\`\`\`

We need the pavucontrol utility to be able to open audio files.

Type qsstv on the terminal to open the program and select the audio file you're going to work with

![image](assets/images/downunder/timtams.png)

qsstv maps the wav audio into an image and we can see at the top left what appears to be an encoded flag.\`QHGPS{UHZOYR_Z3Z3_1BEQ}\`

This is ROT13, we decode the flag to: \`DUTCF{HUMBLE_M3M3_1ORD}\`

Flag: DUTCF{HUMBLE_M3M3_1ORD}`,

  "downunder/discord": `# Misc
## Discord
Points : 10

#### Description

JOIN OUR DISCORD!
![image.jpg](assets/images/downunder/discord-meme.jpg)

### Solution
Take a look at the official [Discord](https://duc.tf/discord).
It was written in general.
![discord.png](assets/images/downunder/discord.png)

Flag : DUCTF{c0n6r475_y0u_h4v3_n0w_j01n3d_0ur_4m4z1n6_d15c0rd}`,

  "downunder/twitter": `# Misc
## Twitter
Points : 10

#### Description
> Check out our Twitter! Find the post with the flag! You can give us a follow if you like <3

### Solution

>Take a look at the official [Twitter](https://twitter.com/DownUnderCTF).
>There are those tweets, but they seem to be base64 encoded.

![twitter.png](assets/images/downunder/twitter.png)

Decode.
\`\`\`bash
$ python
>>> import base64
>>> text = "RFVDVEZ7aHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g/dj1YZlI5aVk1eTk0c30="
>>> print(base64.b64decode(text))
b'DUCTF{https://www.youtube.com/watch?v=XfR9iY5y94s}'
\`\`\`

Flag : DUCTF{https://www.youtube.com/watch?v=XfR9iY5y94s}`,

  "downunder/spectrum": `# Forensics
## On the spectrum
Points: 100

#### Description
>My friend has been sending me lots of WAV files, I think he is trying to communicate with me, what is the message he sent?
>
>Author: scsc
>
>Attached files:
>
>   message_1.wav (sha256: 069dacbd6d6d5ed9c0228a6f94bbbec4086bcf70a4eb7a150f3be0e09862b5ed)

### Solution
We get a \`.wav\` file and, as the title suggest, we might find the flag in the spectogram. For viewing it I used [Sonic Visualizer](https://sonicvisualiser.org/). I played a little with the settings to view it better.

![image](assets/images/downunder/spectrum.png)

Flag: DUCTF{m4bye_n0t_s0_h1dd3n}`,

  // ── Syskron Security CTF ────────────────────
  "syskron/welcome-letter": `# Welcome Letter

>Sanitycheck

>Points - 20

>Read the letter

>Actually the task description is pretty precise about what you need to do .

---

![am-i-sane](assets/images/syskron/am-i-sane.png)

Near the top of the PDF file you'll be able to see the first flag: \`syskronCTF{th4nk-you}\``,

  "syskron/security-headers": `# Security headers

>Web

>Points - 100

>Can you please check the security-relevant HTTP response headers on www.senork.de. Do they reflect current best practices?

---

One of the easier web challenges. Simply take a look at the response headers the web server sends you when you request the page.

Here you'll find one interesting one: \`Flag-Policy\`. The value is the flag: \`syskronCTF{y0u-f0und-a-header-flag}\``,

  "syskron/redacted-news": `# Redacted news

>Steganography

>Points - 100

> Oh, this is a news report on our Secure Line project. But someone removed a part of the story?!

---

Like pretty much every _steganography_ challenge, this one too can be solved by simply using \`stegsolve\`.

![stegsolve](assets/images/syskron/stegsolve.png)

 the flag was: \`syskronCTF{d0-Y0u-UNdEr5TaND-C2eCh?}\``,

  "syskron/dos-attack": `# DOS Attack

>OSINT

>Points - 100

>One customer of Senork Vertriebs GmbH reports that some older Siemens devices repeatedly crash. We looked into it and it seems that there is some malicious network traffic that triggers a DoS condition. Can you please identify the malware used in the DoS attack? We attached the relevant network traffic.
Flag format: syskronCTF{name-of-the-malware}


---

First, take a quick look at the provided _pcap_ file. See that it consists solely of DNS queries:

![dns](assets/images/syskron/dns.png)

now simply do a Google search for something like \`siemens dos dns\` - looking at the results you'll find several articles like [this one](https://www.securityweek.com/flaws-expose-siemens-protection-relays-dos-attacks) which inform you that the malware's name is in fact \`Industroyer\`.

The flag therefore was: \`flag{Industroyer}\``,

  "syskron/change": `# Change

>Steganography
Points - 200

>One of Senork's employees opened a link in a phishing e-mail. After this, strange things happened. But this is likely related to the attached image. I have to check it.

---

Another stego challenge... This time you could have found the flag by either simply using \`strings\` or something like \`exiftool\`:

![copyright](assets/images/syskron/copyright.png)

this copyright notice looks suspiciously like some JavaScript code ... Let's paste it into the browser console and see what happens (not always a good idea, i know :)

![js](assets/images/syskron/js.png)

would you look at that! Looks like a flag to me: \`syskronCTF{l00k5l1k30bfu5c473dj5}\``,

  "syskron/leak-audit": `# Leak audit

>Forensics

>Points - 200

\`\`\`
We found an old dump of our employee database on the dark net! Please check the database and send us the requested information:

    How many employee records are in the file?

    Are there any employees that use the same password? (If true, send us the password for further investigation.)

    In 2017, we switched to bcrypt to securely store the passwords. How many records are protected with bcrypt?

Flag format: answer1_answer2_answer3 (e.g., 1000_passw0rd_987).
\`\`\`

---

The simplest way to solve this is probably to just open the databsae using \`sqlite3\` ... A simple \`.schema\` will now inform you about the database's general structure:

![schema](assets/images/syskron/schema.png)

Now... simply use three or less queries to answer all of the task statement's questions:

1. _How many employee records are in the file?_

\`\`\`sql
SELECT COUNT(*)
FROM   personal;
\`\`\`

\`\`\`txt
376
\`\`\`

2. _Are there any employees that use the same password? (If true, send us the password for further investigation.)_

\`\`\`sql
SELECT    password, COUNT(*) "count"
FROM      personal
GROUP BY  password
HAVING    count > 1;
\`\`\`

\`\`\`txt
mah6geiVoo|2
\`\`\`

3. _In 2017, we switched to bcrypt to securely store the passwords. How many records are protected with bcrypt?_

\`\`\`sql
SELECT  COUNT(*)
FROM    personal
WHERE   password LIKE '$2b$%';
\`\`\`

\`\`\`
21
\`\`\`

Now, reconstructing the flag was no problem at all: \`flag{376_mah6geiVoo_21}\``,

  "syskron/key-generator": `# Key generator

>Reversing

>Points - 300

>This is our official key generator that we use to derive keys from machine numbers. Our developer put a secret in its code. Can you find it?

---

Reversing the given binary you'll discover a couple of things:

1. It checks, whether or not the entered string has a length of \`7\` and stops/continues execution accordingly.

![strlen](assets/images/syskron/strlen.png)

2. It compares the input string to the static string \`laska!!\`.

![strrev](assets/images/syskron/strrev.png)

This is were it gets interesting:

* if the strings don't match, it'll just generate some random serial number according to this pattern:

\`\`\`
inp[6]-6 + inp[5]-5 + inp[4]-4 + ... + inp[0]-0
\`\`\`

* if the string do match, however, it calls the function \`octal()\` which prints the following:

\`\`\`
1639171916391539162915791569103912491069173967911091119123955915191639156967955916396391439125916296395591439609104911191169719175

You are not done yet!
\`\`\`

actually, the last step isn't too difficult anymore . The kind message tells us that we're not done yet and the name of the function that prints this gives us a good hint at what could possibly still be missing: \`octal()\`.

Simply split the weird long string at every \`9\` (since this obviously doesn't exist in octal) and decode the resulting string using the octal character codes:

\`\`\`
163 171 163 153 162 157 156 103 124 106 173 67 110 111 123 55 151 163 156 67 55 163 63 143 125 162 63 55 143 60 104 111 116 71 175
\`\`\`

this gives us the flag: \`syskronCTF{7HIS-isn7-s3cUr3-c0DIN9}\``
};
