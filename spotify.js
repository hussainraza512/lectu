let currentSong = new Audio();
let playSpeed = 1.0;
let songs;
let currentSongIndex = 0;
let activeSongIndex = 0;

const secondsToMinutesSeconds = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.round(seconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
};

async function getSongs(songList) {
    return await Promise.resolve(songList);
}

const playNextSong = () => {
    activeSongIndex = (activeSongIndex + 1) % songs.length;
    currentSongIndex = songs.findIndex((song) => song === songs[activeSongIndex]);
    playMusic(songs[activeSongIndex].split("/").pop().replace(/%20/g, " "));
};

const playPreviousSong = () => {
    activeSongIndex = (activeSongIndex - 1 + songs.length) % songs.length;
    currentSongIndex = songs.findIndex((song) => song === songs[activeSongIndex]);
    playMusic(songs[activeSongIndex].split("/").pop().replace(/%20/g, " "));
};

const initializePlayer = async (songList) => {
    songs = await getSongs(songList);

    if (songs && songs.length > 0) {
        playMusic(songs[0].split("/").pop().replace(/%20/g, " "), true);
    }

    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0];
    songUL.innerHTML = ""; // Clear existing song list

    for (const song of songs) {
        const songName = song.split("/").pop().replace(/%20/g, " ");

        let li = document.createElement("li");
        li.innerHTML = `
            <img class="invert" src="https://raw.githubusercontent.com/CodeWithHarry/Sigma-Web-Dev-Course/cb54aa395ad2ff4fbfd64353b250bfaedee0611d/Video%2084%20-%20Project%202%20-%20Spotify%20Clone/img/music.svg" alt="">
            <div class="info">
                <div>${songName}</div>
                <div></div>
            </div>
            <div class="playnow">
                <span>Play Now</span>
                <img class="invert" src="https://raw.githubusercontent.com/CodeWithHarry/Sigma-Web-Dev-Course/cb54aa395ad2ff4fbfd64353b250bfaedee0611d/Video%2084%20-%20Project%202%20-%20Spotify%20Clone/img/play.svg" alt="">
            </div>
        `;
        songUL.appendChild(li);
    }

    Array.from(songUL.getElementsByTagName("li")).forEach(li => {
        li.addEventListener("click", () => {
            const songName = li.querySelector(".info").firstElementChild.innerHTML.trim();
            playMusic(songName);
        });
    });
};

const playMusic = (track, pause = false) => {
    currentSong.src = encodeURIComponent(track);

    if (!pause) {
        currentSong.play();
        play.src = "https://raw.githubusercontent.com/CodeWithHarry/Sigma-Web-Dev-Course/cb54aa395ad2ff4fbfd64353b250bfaedee0611d/Video%2084%20-%20Project%202%20-%20Spotify%20Clone/img/pause.svg";
    }

    document.querySelector(".song-info").innerHTML = track;
    document.querySelector(".song-time").innerHTML = "00:00 / 00:00";
};

const main = () => {
    // ... (existing code)


    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play();
            play.src = "https://raw.githubusercontent.com/CodeWithHarry/Sigma-Web-Dev-Course/cb54aa395ad2ff4fbfd64353b250bfaedee0611d/Video%2084%20-%20Project%202%20-%20Spotify%20Clone/img/pause.svg";
        } else {
            currentSong.pause();
            play.src = "https://raw.githubusercontent.com/CodeWithHarry/Sigma-Web-Dev-Course/cb54aa395ad2ff4fbfd64353b250bfaedee0611d/Video%2084%20-%20Project%202%20-%20Spotify%20Clone/img/play.svg";
        }
    });




    currentSong.addEventListener("timeupdate", () => {
        const formattedCurrentTime = secondsToMinutesSeconds(currentSong.currentTime);
        const formattedDuration = secondsToMinutesSeconds(currentSong.duration);

        document.querySelector(".song-time").innerHTML = `${formattedCurrentTime} / ${formattedDuration}`;
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
    });

    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width);
        let newTime = percent * currentSong.duration;

        document.querySelector(".circle").style.left = percent * 100 + "%";

        if (!isNaN(newTime) && isFinite(newTime)) {
            currentSong.currentTime = newTime;
        }
    });






    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0";
    });

    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-120%";
    });




    const nextButton = document.querySelector("#next");
    const previousButton = document.querySelector("#previous");

    nextButton.addEventListener("click", playNextSong);
    previousButton.addEventListener("click", playPreviousSong);


    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e) => {

        console.log(e, e.target, e.target.value);
        currentSong.volume = parseInt(e.target.value) / 100

    })



    const speedDropdown = document.querySelector("#playSpeedDropdown");

    // Set initial speed value
    speedDropdown.value = playSpeed;

    // Event listener for changing playback speed
    speedDropdown.addEventListener("change", () => {
        playSpeed = parseFloat(speedDropdown.value);
        currentSong.playbackRate = playSpeed;
    });





    document.querySelector(".one").addEventListener("click", () => {
        const oneSongList = ["Lec 1.ogg",
                              "Lec 2.ogg",
                              "Lec 3.ogg",
                              "Lec 4.ogg" ];
        initializePlayer(oneSongList);
    });




    document.querySelector(".two").addEventListener("click", () => {
        const twoSongList = [
            
                            "D Lec 1.ogg"

      ];
        initializePlayer(twoSongList);
    });


    document.querySelector(".three").addEventListener("click", () => {
        const threeSongList = [
            
                            "N Lec 1.ogg"

      ];
        initializePlayer(threeSongList);
    });


    document.querySelector(".four").addEventListener("click", () => {
        const fourSongList = [
            
                            "PC Lec 1.ogg"

      ];
        initializePlayer(fourSongList);
    });

    document.querySelector(".five").addEventListener("click", () => {
        const fiveSongList = [
            
                            "RR Lec 1.ogg"

      ];
        initializePlayer(fiveSongList);
    });


};

main();  // Call the main function to initialize the player




let swiperTestimonial = new Swiper(".card-container", {
    loop: true,
    grabCursor: true,
    spaceBetween: 48,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    breakpoints: {
      700: {
        slidesPerView: 2, // Corrected from slidePerView to slidesPerView
      },
    },
  });
  


  const swipeElement = document.querySelector(".swipe");

  function adjustSwipeDisplay() {
    const screenWidth = window.innerWidth;
    const displayStyle = screenWidth <= 700 ? "block" : "none";
    swipeElement.style.display = displayStyle;
  }
  
  // Call the function initially to set the display based on the current screen width
  adjustSwipeDisplay();
  
  // Attach the function to the window's resize event to update the display dynamically
  window.addEventListener("resize", adjustSwipeDisplay);
  