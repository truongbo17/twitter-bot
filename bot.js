const startBot = document.getElementById('startBot');
const stopBot = document.getElementById('stopBot');
let runScroll, currentTab;
let countScroll = 0;

// Cuộn rất nhanh và rất mượt
const scroll_level_1 = {
  'timeout': 1,
  'pixel': 1
};

// Cuộn rất nhanh và mượt
const scroll_level_2 = {
  'timeout': 1,
  'pixel': 10
};

// Cuộn bình thường
const scroll_level_3 = {
  'timeout': 10,
  'pixel': 1
};

// Cuộn bình thường và khá giật
const scroll_level_4= {
  'timeout': 100,
  'pixel': 5
};

// Cuộn khá chậm và giật
const scroll_level_5= {
  'timeout': 200,
  'pixel': 20
};

// Cuộn cực chậm
const scroll_level_6= {
  'timeout': 200,
  'pixel': 1
};

document.addEventListener("DOMContentLoaded", function(event) {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    const tab = tabs[0];
    if (tab) {
      currentTab = tab;
    }
  });
});

startBot.onclick = startBotPlay;
stopBot.onclick = stopBotPlay;

async function startBotPlay() {
  clearTimeout(runScroll);

  await chrome.storage.session.set({scroll_pixel: scroll_level_3.pixel});
  await chrome.storage.session.set({scroll_timeout: scroll_level_3.timeout});

  await chrome.storage.session.set({is_scroll: true});

  runScroll = setInterval(await runBot, scroll_level_3.timeout);
}

async function runBot() {
  const scroll_pixel = await chrome.storage.session.get('scroll_pixel');
  const scroll_timeout = await chrome.storage.session.get('scroll_timeout');
  const is_scroll = await chrome.storage.session.get('is_scroll');

  chrome.scripting.executeScript({
    target: {tabId: currentTab.id},
    func: (scroll_timeout, scroll_pixel, is_scroll) => {
      if (is_scroll) {
        window.scrollBy(0, scroll_pixel)
      }

      function weightedRandomChoice(e, n) {
        let t = n.reduce((e, n) => e + n, 0), o = Math.random() * t, r = 0;
        for (let d = 0; d < e.length; d++) if (o <= (r += n[d])) return e[d]
      }

      function getComment() {
        let comments = '"If you\'re so afraid of failure, you will never succeed. You have to take chances.","Mario Andretti","Failure,Chance,You,Succeed"\n' +
          '"I don\'t think it\'s in any way harmful, this marriage of media and politicians. I think it enhances the communications process considerably and makes it possible for the public to be far more aware, far more up-to-date on issues and the opposite sides of the issues.","Walter Cronkite","Marriage,Media,Process,Think"\n' +
          '"It is easy to hate and it is difficult to love. This is how the whole scheme of things works. All good things are difficult to achieve; and bad things are very easy to get.","Confucius","Love,Good,Hate,Good Things"\n' +
          '"I teach students that what people say about failure in politics is mostly wrong. People always told me, \'They\'ll praise you on your way up and kick you on your way down.\' That wasn\'t my experience. I can\'t walk down the street in Toronto without someone coming up and saying hello.","Michael Ignatieff","Failure,Experience,Politics,People"\n' +
          '"To measure the success of our societies, we should examine how well those with different abilities, including persons with autism, are integrated as full and valued members.","Ban Ki-moon","Success,Measure,Well,Autism"\n' +
          '"I\'m a foodie. I enjoy it a lot, and contrary to what it looks, I eat a lot. My comfort food, of all things, would be southern soul barbecue.","Zach Johnson","Food,Soul,Enjoy,Comfort"\n' +
          '"In complete darkness, it is only knowledge and wisdom that separates us.","Janet Jackson","Wisdom,Knowledge,Darkness"\n' +
          '"Priesthood quorums teach and assist their members to attain good health, financial stability, and a year\'s supply of food and clothing. They also teach their members to be self-reliant and to give their time, talents, and means in behalf of the Church, community, and needy.","Joseph B. Wirthlin","Food,Time,Health,Community"\n' +
          '"You don\'t need a silver fork to eat good food.","Paul Prudhomme","Food,Good,Good Food,You"\n' +
          '"I\'m a little self-conscious about my body. I love to wear hoodies because you can get cozy and eat some food and your belly doesn\'t show!","Jared Padalecki","Food,Love,Body,You"\n' +
          '"I hope the cooks who are working for me now are getting that kind of experience so they can use what they\'re learning now as a foundation for a great career.","Thomas Keller","Learning,Hope,Experience,Great"\n' +
          '"I think that gay marriage should be between a man and a woman.","Arnold Schwarzenegger","Marriage,Man,Woman,Gay"\n' +
          '"The biggest misconception people have about me is that when they see how young I am, they think, \'Oh, this guy must have always wanted to be in politics; his parents must have been politically connected.\' I\'m a finance major and always intended to go into business.","Aaron Schock","Finance,Business,Politics,Parents"\n' +
          '"For me, good films and good books are irreducible to a lesson. You can\'t just kind of translate them into one statement. On the contrary, the more you do that, the less wisdom in art there is.","Pawel Pawlikowski","Wisdom,Art,Good,Me"\n' +
          '"The Gross National Product measures neither our wit nor our courage, neither our wisdom nor our learning, neither our compassion nor our devotion to our country. It measures everything, in short, except that which makes life worthwhile, and it can tell us everything about America - except whether we are proud to be Americans.","Robert Kennedy","Wisdom,Life,Learning,Courage"\n' +
          '"I may not have proved a great explorer, but we have done the greatest march ever made and come very near to great success.","Robert Falcon Scott","Success,Great,Greatest,Done"\n' +
          '"Well I think in a marriage you have to be honest and ask yourself, you know, what is my role? What is my responsibility?","Hillary Clinton","Marriage,Responsibility,Yourself"\n' +
          '"In almost every marriage there is a selfish and an unselfish partner. A pattern is set up and soon becomes inflexible, of one person always making the demands and one person always giving way.","Iris Murdoch","Marriage,Selfish,Giving,Partner"\n' +
          '"We humans have lost the wisdom of genuinely resting and relaxing. We worry too much. We don\'t allow our bodies to heal, and we don\'t allow our minds and hearts to heal.","Thich Nhat Hanh","Wisdom,Worry,Lost,Heal"\n' +
          '"I think that Obama\'s failure to reestablish the rule of law in money matters is the most damaging thing that he\'s done - and perhaps the most damaging thing that has happened in American politics in my lifetime. Because once the rule of law is absent in money matters, then anything really goes in politics.","James Howard Kunstler","Failure,Money,Politics,American"\n' +
          '"A man of great memory without learning hath a rock and a spindle and no staff to spin.","George Herbert","Learning,Great,Man,Memory"\n' +
          '"Look, Congress has allocated more money to finance the upcoming Iraqi elections than it has for the American elections. There\'s something wrong with that.","Donna Brazile","Finance,Money,American,Look"\n' +
          '"We are constituted so that simple acts of kindness, such as giving to charity or expressing gratitude, have a positive effect on our long-term moods. The key to the happy life, it seems, is the good life: a life with sustained relationships, challenging work, and connections to community.","Paul Bloom","Life,Positive,Work,Kindness"\n' +
          '"Watching John Lasseter\'s films, I think I can understand better than anyone that what he\'s doing, is going straight ahead with his vision and working really hard to get that vision into film form. And I feel that my understanding this of him is my friendship towards him.","Hayao Miyazaki","Friendship,Vision,Understanding,Think"\n' +
          '"When you come off \'The X Factor,\' you\'re more likely to be a failure than a success because people almost want you to fail. There\'s this kind of feeling that you\'re separate from everyone else. You get it from artists, people in the industry, people at record labels.","Olly Murs","Failure,Success,People,Want"\n' +
          '"The main reason for the failure of the modern medical science is that it is dealing with results and not causes. Nothing more than the patching up of those attacked and the burying of those who are slain, without a thought being given to the real strong hold.","Edward Bach","Failure,Science,Strong,Medical"\n' +
          '"I failed the LSAT. Basically, if I had not failed, I\'d have been a lawyer and there would be no Spanx. I think failure is nothing more than life\'s way of nudging you that you are off course. My attitude to failure is not attached to outcome, but in not trying. It is liberating.","Sara Blakely","Failure,Life,Attitude,Lawyer"\n' +
          '"I would have told him that I appreciated his friendship through the years and that I had learned a lot from him. I really loved Frank like you do a brother.","Jimmy Carl Black","Friendship,Brother,Loved,You"\n' +
          '"My parents, and librarians along the way, taught me about the space between words; about the margins, where so many juicy moments of life and spirit and friendship could be found. In a library, you could find miracles and truth and you might find something that would make you laugh so hard that you get shushed, in the friendliest way.","Anne Lamott","Friendship,Life,Truth,Parents"\n' +
          '"Give a little love to a child, and you get a great deal back.","John Ruskin","Love,Family,Great,Child"\n' +
          '"You accept failure as a possible outcome of some of the experiments. If you don\'t get failures, you\'re not pushing hard enough on the objectives.","John Poindexter","Failure,You,Accept,Possible"\n' +
          '"Basketball, in America, is like a culture. It is like a foreigner learning a new language. It is difficult to learn foreign languages and it will also be difficult for me to learn the culture for basketball here.","Yao Ming","Learning,Culture,America,Language"\n' +
          '"When I eat with my friends, it is a moment of real pleasure, when I really enjoy my life.","Monica Bellucci","Food,Life,Friends,Moment"\n' +
          '"What does love look like? It has the hands to help others. It has the feet to hasten to the poor and needy. It has eyes to see misery and want. It has the ears to hear the sighs and sorrows of men. That is what love looks like.","Saint Augustine","Love,Sympathy,Help Others,Eyes"\n' +
          '"I used to pre-rehearse everything and then bring my pre-rehearsed performance to the set. Now, I\'m learning to let it happen in the moment. American actors are much better at that than British actors. If I knew how to trust myself, I would have been much more relaxed. Maybe I would have less gray hairs today.","Hugh Grant","Learning,Trust,Today,Myself"\n' +
          '"Bad faith likes discourse on friendship and loyalty.","Mason Cooley","Friendship,Faith,Loyalty,Bad"\n' +
          '"Just as the unique characteristics of both males and females contribute to the completeness of a marriage relationship, so those same characteristics are vital to the rearing, nurturing, and teaching of children.","David A. Bednar","Marriage,Relationship,Children"\n' +
          '"I don\'t know of many evangelicals who want to deny gay couples their legal rights. However, most of us don\'t want to call it marriage, because we think that word has religious connotations, and we\'re not ready to see it used in ways that offend us.","Tony Campolo","Marriage,Legal,Gay,Think"\n' +
          '"Daring to set boundaries is about having the courage to love ourselves, even when we risk disappointing others.","Brene Brown","Love,Courage,Risk,Daring"\n' +
          '"The secret to success, to parenting, to life, is to not count up the cost. Don\'t focus on all the steps it will take. Don\'t stare into the abyss at the giant leap it will take. That view will keep you from taking the next small step.","Regina Brett","Success,Life,Parenting,Focus"\n' +
          '"A good memory is surely a compost heap that converts experience to wisdom, creativity, or dottiness; not that these things are of much earthly value, but at least they may keep you amused when the world is keeping you locked away or shutting you out.","Michael Leunig","Wisdom,Good,Experience,Creativity"\n' +
          '"I never feel lonely if I\'ve got a book - they\'re like old friends. Even if you\'re not reading them over and over again, you know they are there. And they\'re part of your history. They sort of tell a story about your journey through life.","Emilia Fox","Life,History,Journey,Friends"\n' +
          '"We\'ll continue to heal human bodies through biotechnology but we\'ll also increasingly feed, clothe and house the world through bioengineered systems. Ultimately, there\'s no reason why live animals should be used in any part of our food or goods chain and we\'re working to make that a reality.","Ryan Bethencourt","Food,World,Reality,Why"\n' +
          '"Save the Children is an awesome charity that has helped more than 125 million children around the world, providing everything from school books to food to blankets and shelter.","PewDiePie","Food,Children,School,World"\n' +
          '"I think about food all the time. It\'s my passion; it\'s my profession. But some people think about food all the time because they\'re hungry. We can put an end to this if we join forces and lend a hand.","Cat Cora","Food,Time,Passion,End"\n' +
          '"I\'m into the food in Vegas. I\'m willing to go to nice restaurants for sushi and stuff like that.","Britney Spears","Food,Vegas,Sushi,Nice"\n' +
          '"To enter upon the marriage union is one of the most deeply important events of life. It cannot be too prayerfully treated. Our happiness, our usefulness, our living for God or for ourselves afterwards, are often most intimately connected with our choice. Therefore, in the most prayerful manner, this choice should be made.","George Muller","Marriage,Life,Happiness,God"\n' +
          '"The wisdom of the wise is an uncommon degree of common sense.","Dean Inge","Wisdom,Wise,Common Sense,Uncommon"\n' +
          '"Students and postdoctoral fellows largely depend on the support of the public sector to finance the training and research that will make them world-renowned scientists.","Carol W. Greider","Finance,Training,Support,Research"\n' +
          '"A man cannot be said to succeed in this life who does not satisfy one friend.","Henry David Thoreau","Friendship,Life,Man,Friend"\n' +
          '"The objectification of females is not a good thing! Not every rapper does this, but when the lyrics focus solely on the strip club, \'poppin\' bottles\' and how many girls they can \'tap,\' it distorts what kids are learning. I think if there was more of a female presence in hip hop we could break up the monotony. It\'s all about balance.","Queen Latifah","Learning,Good,Focus,Balance"\n' +
          '"Success on one project does not necessarily mean success in the next project. You\'ve got to be prepared in everything you do.","Helmut Jahn","Success,Be Prepared,You,Mean"\n' +
          '"Our strength in finance has led us to set up an international financial centre with medium and long-term objectives, especially to develop Islamic financial and insurance services.","Hassanal Bolkiah","Finance,Strength,Financial"\n' +
          '"I guess I\'m motivated by the fear of failure to some degree and knowing what can happen when you don\'t do things the way you need to do them to have success.","Nick Saban","Failure,Success,Fear,You"\n' +
          '"Just as physical exercise is a well-known and well-accepted means to improve health for anyone, regardless of age or background, so can the brain be put \'into shape\' for optimal learning.","Naveen Jain","Learning,Health,Age,Brain"\n' +
          '"Find a good teacher that will keep the game fun. Work hard and don\'t be afraid to have success or disappointment. That is what golf is all about.","Paula Creamer","Success,Work,Teacher,Good"\n' +
          '"I like to think I\'m a pretty good friend. I love having a good time, and I enjoy being able to share those good times with others.","Jacob Batalon","Love,Time,Good,Friend"\n' +
          '"I used to think that divorce meant failure, but now I see it more as a step along the path of self-realization and growth.","Alana Stewart","Failure,Growth,Path,Step"\n' +
          '"When my mother had four girls, and she could tell her marriage was falling apart, she went back to college and got her degree in music and education.","Andie MacDowell","Marriage,Education,Music,Mother"\n' +
          '"A home with a loving and loyal husband and wife is the supreme setting in which children can be reared in love and righteousness and in which the spiritual and physical needs of children can be met.","David A. Bednar","Love,Family,Home,Children"\n' +
          '"In a full heart there is room for everything, and in an empty heart there is room for nothing.","Antonio Porchia","Love,Heart,Everything,Empty"\n' +
          '"When you encourage others, you in the process are encouraged because you\'re making a commitment and difference in that person\'s life. Encouragement really does make a difference.","Zig Ziglar","Life,Commitment,Encouragement"\n' +
          '"Marriage is the most obvious public practice about which information is readily available. When combined with the traditional Jewish concern for continuity and self-preservation - itself only intensified by the memory of the Holocaust - marriage becomes the sine qua non of social membership in the modern Orthodox community.","Noah Feldman","Marriage,Community,Practice,Memory"\n' +
          '"You must learn day by day, year by year to broaden your horizon. The more things you love, the more you are interested in, the more you enjoy, the more you are indignant about, the more you have left when anything happens.","Ethel Barrymore","Wisdom,Love,Day,Enjoy"\n' +
          '"Love is a sacred reserve of energy; it is like the blood of spiritual evolution.","Pierre Teilhard de Chardin","Love,Spiritual,Love Is"\n' +
          '"The best wisdom is earned through experience, particularly mistakes.","Sophia Amoruso","Wisdom,Best,Experience,Mistakes"\n' +
          '"If you look at the common denominator of all the comics who have had big success, it\'s being true to their nature... that\'s what takes a long time to learn.","Ron White","Success,Nature,Time,Long"\n' +
          '"Cultivation to the mind is as necessary as food to the body.","Marcus Tullius Cicero","Food,Education,Mind,Body"\n' +
          '"Vanity can easily overtake wisdom. It usually overtakes common sense.","Julian Casablancas","Wisdom,Common Sense,Vanity,Common"\n' +
          '"I got IRS records to finance what I wanted to do.","Penelope Spheeris","Finance,Records,IRS,Got"\n' +
          '"And the thing about me is, I have a lot of mellow songs, because they\'re the easiest for me to write. I wanted to try to make some more upbeat songs, so, I ended up gravitating toward writing songs with friends, which was a great learning process, and also we came up with great songs. Those are the songs that came out the most naturally.","Priscilla Ahn","Learning,Friends,Great,Writing"\n' +
          '"The next Bill Gates will not start an operating system. The next Larry Page won\'t start a search engine. The next Mark Zuckerberg won\'t start a social network company. If you are copying these people, you are not learning from them.","Peter Thiel","Learning,People,Start,Search"\n' +
          '"If all the economists were laid end to end, they\'d never reach a conclusion.","George Bernard Shaw","Finance,End,Reach,Economists"\n' +
          '"If music be the food of love, play on.","William Shakespeare","Love,Music,Food,Play"\n' +
          '"The ladder of success is never crowded at the top.","Napoleon Hill","Success,Ladder,Success Is,Top"\n' +
          '"I delivered lectures, and I was also a consultant for international companies in finance, both private equity and big venture capital funds.","Ehud Barak","Finance,Equity,Consultant,Big"\n' +
          '"Nothing succeeds like success. Get a little success, and then just get a little more.","Maya Angelou","Success,Nothing,Just,Little"\n' +
          '"I mix talents and friendship, which is not very professional, but it\'s my way of thinking. So I love Azzedine Alaia, because I\'ve known him for 30 years, and he\'s making my dresses most of the time.","Carine Roitfeld","Friendship,Love,Time,Thinking"\n' +
          '"Become slower in your journey through life. Practice yoga and meditation if you suffer from \'hurry sickness.\' Become more introspective by visiting quiet places such as churches, museums, mountains and lakes. Give yourself permission to read at least one novel a month for pleasure.","Wayne Dyer","Life,Journey,Mountains,Yourself"\n' +
          '"We came from a family where we ran our own small business. Our dad made his own products. We made our own sausages, our own meatloafs, our own pickles. Dad had to do everything himself. He had to figure out how to finance his business.","Marcy Kaptur","Finance,Family,Business,Small"\n' +
          '"Failure is the condiment that gives success its flavor.","Truman Capote","Success,Failure,Flavor,Gives"\n' +
          '"The ultimate value of life depends upon awareness and the power of contemplation rather than upon mere survival.","Aristotle","Life,Power,Value,Survival"\n' +
          '"I\'ve learned there\'s a big difference between a long-focused value investor and a good short-seller. That difference is psychological and I think it falls into the realm of behavioral finance.","James Chanos","Finance,Good,Value,Think"\n' +
          '"The turning point was when I hit my 30th birthday. I thought, if really want to write, it\'s time to start. I picked up the book How to Write a Novel in 90 Days. The author said to just write three pages a day, and I figured, I can do this. I never got past Page 3 of that book.","James Rollins","Motivational,Birthday,Time,Day"\n' +
          '"I grew and learned, journeyed and understood, that someone who is afraid of failing won\'t get anywhere, and someone who dares to do it runs the risk of failure if they don\'t learn, correct their mistakes, and get back up.","Fabrizio Moreira","Failure,Mistakes,Risk,Learn"\n' +
          '"I\'m learning to trust other people to do things. My time is limited, and I\'d rather be spending it with my kids.","Kourtney Kardashian","Learning,Time,Trust,People"\n' +
          '"Success cannot come from standstill men. Methods change and men must change with them.","James Cash Penney","Success,Change,Men,Cannot"\n' +
          '"The luster of an experience can actually go up with time. So, learning to play a new instrument, learning a new language - those sorts of things will pay dividends for years or decades to come.","Dan Buettner","Learning,Time,Experience,Language"\n' +
          '"I was working with Jay Z while I was still learning how to be who I was about to become.","Travis Scott","Learning,Working,Become,Still"\n' +
          '"It is always incomprehensible to a man that a woman should ever refuse an offer of marriage.","Jane Austen","Marriage,Man,Woman,Should"\n' +
          '"Land is the secure ground of home, the sea is like life, the outside, the unknown.","Stephen Gardiner","Life,Home,Sea,Unknown"\n' +
          '"The weaker partner in a marriage is the one who loves the most.","Eleonora Duse","Marriage,Partner,Who,Most"\n' +
          '"I don\'t rely on feng shui. I believe hard work brings us good luck and success.","John Gokongwei","Success,Work,Hard Work,Good"\n' +
          '"What spectacle can be more edifying or more seasonable, than that of Liberty and Learning, each leaning on the other for their mutual and surest support?","James Madison","Learning,Support,Liberty,More"\n' +
          '"Life is full of misery, loneliness, and suffering - and it\'s all over much too soon.","Woody Allen","Life,Loneliness,Suffering"\n' +
          '"Traditional marriage is what should be sanctioned.","Jeb Bush","Marriage,Should,Traditional"\n' +
          '"Facts are to the mind what food is to the body.","Edmund Burke","Food,Mind,Body,Facts"\n' +
          '"Like the marriage contract you entered into, your divorce is a legal transaction. Treat it that way. Try not to let emotion, hurt, fear or anger dictate the circumstances of your discussions or negotiations.","Laura Wasser","Marriage,Fear,Anger,Legal"\n' +
          '"All of us are born for a reason, but all of us don\'t discover why. Success in life has nothing to do with what you gain in life or accomplish for yourself. It\'s what you do for others.","Danny Thomas","Success,Life,Yourself,You"\n' +
          '"The road to success and the road to failure are almost exactly the same.","Colin R. Davis","Success,Failure,Road,Same"\n' +
          '"Well, I think that there\'s a very thin dividing line between success and failure. And I think if you start a business without financial backing, you\'re likely to go the wrong side of that dividing line.","Richard Branson","Finance,Success,Business,Failure"\n' +
          '"My philosophy is my learning process. Until you die, you must evolve and improve.","Miyavi","Learning,Philosophy,Process,Die"\n' +
          '"Many a person has held close, throughout their entire lives, two friends that always remained strange to one another, because one of them attracted by virtue of similarity, the other by difference.","Emil Ludwig","Friendship,Friends,Strange,Virtue"\n' +
          '"I\'ve interviewed presidents and royalty, rock stars and movie stars, famous generals and captains of industry; I\'ve had front row seats at Super Bowls, World Series, and Olympic Games; my books have been on best-seller lists, and my marriage is a long-running success.","Tom Brokaw","Marriage,Success,Stars,World"\n' +
          '"Never does nature say one thing and wisdom another.","Juvenal","Wisdom,Nature,Never,Say"\n' +
          '"Marriage is survived just on the basis of ordinary etiquette, day in and day out. Also cooking together helps a lot... I\'ve seen all these marriages that failed. Those people are always hollering at each other. That doesn\'t work.","Jim Harrison","Marriage,Work,Day,Together"\n' +
          '"I have a loyalty that runs in my bloodstream, when I lock into someone or something, you can\'t get me away from it because I commit that thoroughly. That\'s in friendship, that\'s a deal, that\'s a commitment. Don\'t give me paper - I can get the same lawyer who drew it up to break it. But if you shake my hand, that\'s for life.","Jerry Lewis","Friendship,Life,Loyalty,Commitment"\n' +
          '"I\'ve lived to see key parts of my research absorbed in textbooks and in central banks around the world. And some finance ministries, too.","Edmund Phelps","Finance,Research,World,Key"\n' +
          '"I want to spend my life with someone and do nice things and go on adventures, read books and have nice food and celebrate things. I don\'t want to spend the rest of my life in the bedroom like some people who just go to bed and never get out again.","Tracey Emin","Food,Life,Celebrate,People"\n' +
          '"The more natural or eco-based products you can introduce into your beauty regimen, the more beneficial it is for your skin. It\'s similar to introducing organic food into your daily diet.","Ivanka Trump","Food,Beauty,Daily,Diet"\n' +
          '"Love is like the wild rose-briar; Friendship like the holly-tree. The holly is dark when the rose-briar blooms, but which will bloom most constantly?","Emily Bronte","Friendship,Love,Love Is,Dark"\n' +
          '"A cardinal rule in budgeting and saving is to pay yourself first. Once your paycheck hits your account, wisdom has it that you should move some amount to savings even before you pay the bills.","John Rampton","Wisdom,Yourself,You,Savings"\n' +
          '"Life has been kind to me. I am happy with the love and appreciation that I have been getting throughout my career. I feel blessed.","Vidya Balan","Love,Life,Happy,Appreciation"\n' +
          '"You can\'t expect to hit the jackpot if you don\'t put a few nickels in the machine.","Flip Wilson","Motivational,You,Machine,Expect"\n' +
          '"It\'s almost seems as though there\'s a battle going on between the public and all the fast-food establishments, and, believe me, I think it\'s very tasty food.","Regis Philbin","Food,Battle,Believe,Me"\n' +
          '"You don\'t go into anything contemplating failure, because if you did, you wouldn\'t make it.","Simon Cowell","Failure,You,Go,Anything"\n' +
          '"I always like to say that our brand or our philosophy has always been kind of this marriage between the \'food as indulgence,\' and it\'s also been about \'food as health,\' that food is vitality.","John Mackey","Food,Marriage,Health,Philosophy"\n' +
          '"I have inspiration and feelings of being alive most every day I live.","Judy Collins","Life,Day,Feelings,Inspiration"\n' +
          '"Eros will have naked bodies; Friendship naked personalities.","C. S. Lewis","Friendship,Naked,Will,Personalities"\n' +
          '"Learning music by reading about it is like making love by mail.","Luciano Pavarotti","Learning,Love,Music,Reading"\n' +
          '"To keep your secret is wisdom; to expect others to keep it is folly.","William Samuel Johnson","Wisdom,Others,Secret,Expect"\n' +
          '"During my first marriage, my career was the most important thing in my life.","Michael Douglas","Marriage,Life,My Life,Important"\n' +
          '"I\'ve learned that mistakes can often be as good a teacher as success.","Jack Welch","Success,Teacher,Good,Mistakes"\n' +
          '"I always prayed that God would give me the wisdom and the vision to do the things on this earth that I was supposed to do to express His life and love and His will.","Billy Ray Cyrus","Wisdom,Love,Life,God"\n' +
          '"Keep in mind that neither success nor failure is ever final.","Roger Babson","Failure,Success,Mind,Final"\n' +
          '"I\'m not wise, but the beginning of wisdom is there; it\'s like relaxing into - and an acceptance of - things.","Tina Turner","Wisdom,Wise,Beginning,Acceptance"\n' +
          '"Plunderous is the palate I gift to you, openly I hug the universe of our friendship expanding its outer limit.","Bradley Chicho","Friendship,Gift,Universe,Limit"\n' +
          '"There are no secrets to success. It is the result of preparation, hard work, and learning from failure.","Colin Powell","Learning,Work,Success,Business"\n' +
          '"Love me or hate me, both are in my favour. If you love me, I will always be in your heart, and if you hate me, I will be in your mind.","Qandeel Baloch","Love,Heart,Mind,Hate"\n' +
          '"Life\'s like a play: it\'s not the length, but the excellence of the acting that matters.","Lucius Annaeus Seneca","Life,Excellence,Acting,Play"\n' +
          '"Love is the only force capable of transforming an enemy into a friend.","Martin Luther King, Jr.","Friendship,Love,Love Is,Friend"\n' +
          '"I think there are a lot of people who are afraid to be who they are, and if I have to sacrifice a little bit of fame and a little bit of success because I\'m being 100 percent truthful with who I am, hopefully that will create a paved way for someone else.","Todrick Hall","Success,I Am,Sacrifice,People"\n' +
          '"You have to grow thick skin and that only comes with time and learning.","Karlie Kloss","Learning,Time,Grow,You"\n' +
          '"I want to safeguard the value of lunch. For me, it is sacred. My family and I always have lunch and dinner together. And we always sit down. Food does not taste the same if you are standing up!","Brunello Cucinelli","Food,Family,Together,Lunch"\n' +
          '"Marriage is popular because it combines the maximum of temptation with the maximum of opportunity.","George Bernard Shaw","Marriage,Opportunity,Temptation"\n' +
          '"I think one thing as far as my learning curve and what I\'m learning - there is a time to take a sack, and then there is also a time to try to find a way to maybe throw the ball at a receiver\'s feet.","Brock Osweiler","Learning,Time,Think,Feet"\n' +
          '"We should measure welfare\'s success by how many people leave welfare, not by how many are added.","Ronald Reagan","Success,People,Measure,Welfare"\n' +
          '"A marriage doesn\'t have to be perfect, but you can be perfect for each other.","Jessica Simpson","Marriage,Perfect,You,Each"\n' +
          '"It is the hopeful, buoyant, cheerful attitude of mind that wins. Optimism is a success builder; pessimism an achievement killer.","Orison Swett Marden","Success,Attitude,Achievement"\n' +
          '"The man who makes everything that leads to happiness depends upon himself, and not upon other men, has adopted the very best plan for living happily. This is the man of moderation, the man of manly character and of wisdom.","Plato","Wisdom,Happiness,Best,Character"\n' +
          '"When Gingrich attacked CNN\'s John King for bringing up his alleged proposal of an open marriage to his second wife, Gingrich accused him of lowering the level of discourse in a presidential debate, suggesting that such a discussion is unworthy of consideration by voters.","Robert Dallek","Marriage,Wife,Debate,King"\n' +
          '"My first book was called, \'Mountain, Get Out of My Way,\' where I did an autobiographical sketch, if you will, looking back at myself and looking back at things in my life, and juxtaposing them against things that are happening in other people\'s lives and trying to be motivational.","Montel Williams","Motivational,Life,Myself,Mountain"\n' +
          '"Part of the secret of a success in life is to eat what you like and let the food fight it out inside.","Mark Twain","Success,Life,Food,Fight"\n' +
          '"The Christian life is not a constant high. I have my moments of deep discouragement. I have to go to God in prayer with tears in my eyes, and say, \'O God, forgive me,\' or \'Help me.\'","Billy Graham","Life,God,Deep,Eyes"\n' +
          '"People talk about bullying, but you can be your own bully in some ways. You can be the person who is standing in the way of your success, and that was the case for me.","Katy Perry","Success,Bullying,People,Me"\n' +
          '"There is the love and marriage and family kind of happiness, which is exceedingly boring to describe but nonetheless is important to have and dreadful not to have.","P. J. O\'Rourke","Marriage,Love,Family,Happiness"\n' +
          '"The greatest glory in living lies not in never falling, but in rising every time we fall.","Ralph Waldo Emerson","Failure,Time,Fall,Greatest"\n' +
          '"I am fiscally prudent and socially progressive. I believe in protecting a woman\'s right to choose. I believe in marriage equality.","Andrew Cuomo","Marriage,Equality,I Am,Woman"\n' +
          '"Sometimes the best lighting of all is a power failure.","Douglas Coupland","Failure,Best,Power,Sometimes"\n' +
          '"I swear Kim Kardashian\'s first marriage lasted longer than some of my iPhone chargers.","Lilly Singh","Marriage,First,iPhone,Longer"\n' +
          '"Opportunity does not knock, it presents itself when you beat down the door.","Kyle Chandler","Motivational,Opportunity,Door,You"\n' +
          '"The most happy marriage I can picture or imagine to myself would be the union of a deaf man to a blind woman.","Samuel Taylor Coleridge","Marriage,Happy,Myself,Man"\n' +
          '"Life would be so wonderful if we only knew what to do with it.","Greta Garbo","Life,Only,Wonderful,Knew"\n' +
          '"There\'s a difference between a failure and a fiasco... a fiasco is a disaster of mythic proportions.","Orlando Bloom","Failure,Disaster,Difference"\n' +
          '"Contrary to conventional wisdom, the blue blazer\'s a bit of a loose cannon. A suit decided long ago what it wanted to be, and it doesn\'t want to hear your ideas, but a blue blazer only got around to half the job. So it leaves it up to you to find its bottoms. Gray slacks, blue jeans, patterns, white pants and different blue shades all work.","Willie Geist","Wisdom,Work,Job,Blue"\n' +
          '"There\'s a real wisdom to not saying a thing.","Willem Dafoe","Wisdom,Saying,Real,Thing"\n' +
          '"First love is only a little foolishness and a lot of curiosity.","George Bernard Shaw","Love,Curiosity,Love Is,First"\n' +
          '"Concision in style, precision in thought, decision in life.","Victor Hugo","Life,Decision,Style,Thought"\n' +
          '"I think with my journey so far, it never felt like an overwhelming, overnight success story. I think that\'s good for me because I really got to take my time.","Tori Kelly","Success,Time,Journey,Good"\n' +
          '"There is no innovation and creativity without failure. Period.","Brene Brown","Failure,Innovation,Creativity"\n' +
          '"The trouble with eating Italian food is that five or six days later you\'re hungry again.","George Miller","Food,Eating,You,Hungry"\n' +
          '"I\'m learning to deal with my loneliness because then nobody can muck me around any more.","Amanda Eliasch","Learning,Loneliness,Me,Nobody"\n' +
          '"Study nature, love nature, stay close to nature. It will never fail you.","Frank Lloyd Wright","Love,Learning,Nature,You"\n' +
          '"Your personal life, your professional life, and your creative life are all intertwined. I went through a few very difficult years where I felt like a failure. But it was actually really important for me to go through that. Struggle, for me, is the most inspirational thing in the world at the end of the day - as long as you treat it that way.","Skylar Grey","Life,Inspirational,Failure,Day"\n' +
          '"There is only one difference between a long life and a good dinner: that, in the dinner, the sweets come last.","Robert Louis Stevenson","Life,Good,Long,Dinner"\n' +
          '"I\'ve said many times, \'You learn to win through not liking to lose.\' And that\'s what I mean by learning how to win.","Tom Watson","Learning,Win,Learn,Said"\n' +
          '"What I\'ve been developing is a vegan fast food chain and vegan food markets.","Heather Mills","Food,Fast,Fast Food,Chain"\n' +
          '"Love is the wisdom of the fool and the folly of the wise.","Samuel Johnson","Wisdom,Love,Wise,Love Is"\n' +
          '"In my life I\'ve learned that true happiness comes from giving. Helping others along the way makes you evaluate who you are. I think that love is what we\'re all searching for. I haven\'t come across anyone who didn\'t become a better person through love.","Marla Gibbs","Love,Life,Happiness,Love Is"\n' +
          '"A minute\'s success pays the failure of years.","Robert Browning","Failure,Success,Years,Minute"\n' +
          '"Music is the fourth great material want, first food, then clothes, then shelter, then music.","Christian Nestell Bovee","Food,Music,Great,Want"\n' +
          '"I think \'Soul Food\' had the biggest impact on me because that\'s where I was really able to shine as an actress and because I also met my husband there, and that was a huge turning point in my personal life. So, that show will stick with me forever and ever and ever.","Nicole Ari Parker","Food,Life,Soul,Husband"\n' +
          '"Success is not the absence of failure; it\'s the persistence through failure.","Aisha Tyler","Success,Failure,Persistence"\n' +
          '"Lion sounds that have not grown from the mouse may exude naked power... but cannot convey any wisdom or understanding... The initial steps on the path to courageous speech then are the first tentative steps into the parts of us that cannot speak.","David Whyte","Wisdom,Power,Path,Lion"\n' +
          '"Agriculture is not crop production as popular belief holds - it\'s the production of food and fiber from the world\'s land and waters. Without agriculture it is not possible to have a city, stock market, banks, university, church or army. Agriculture is the foundation of civilization and any stable economy.","Allan Savory","Food,World,Foundation"\n' +
          '"Chancellor Angela Merkel and Wolfgang Schaeuble, her finance minister, are right to oppose fiscal and bank unions without political union.","Edmund Phelps","Finance,Political,Her,Bank"\n' +
          '"My mother had a son from previous marriage and her husband died in Second World War.","Mikhail Baryshnikov","Marriage,War,Mother,Son"\n' +
          '"That it will never come again is what makes life sweet.","Emily Dickinson","Life,Sweet,Will,Never"\n' +
          '"The regret of my life is that I have not said \'I love you\' often enough.","Yoko Ono","Love,Life,I Love You,Regret"\n' +
          '"I always write about subjects which attract me because if I didn\'t, it would be awful, a failure.","Ruth Rendell","Failure,Me,Write,Attract"\n' +
          '"Food Stamp recipients didn\'t cause the financial crisis; recklessness on Wall Street did.","Barack Obama","Food,Financial,Crisis,Street"\n' +
          '"I was born with an enormous need for affection, and a terrible need to give it.","Audrey Hepburn","Love,Affection,Born,I Was Born"\n' +
          '"Kids don\'t need to be taught the value of making; they are natural makers, at least until traditional education makes them afraid of making mistakes. The long-term value of making for kids is in learning to become an active participant in the world around them rather than a consumer of prepackaged products and solutions.","Mark Frauenfelder","Learning,Education,Mistakes,World"\n' +
          '"My mother never met a gadget she didn\'t like. There were tube pans for baking the angel food cakes my father could have after his first heart attack, and Bundt pans and loaf pans and baking pans and grilling pans.","Janet Fitch","Food,Father,Mother,Heart"\n' +
          '"There is a huge difference between failing and failure. Failing is trying something that you learn doesn\'t work. Failure is throwing in the towel and giving up. True success comes from failing repeatedly and as quickly as possible, before your cash or your willpower runs out.","Jay Samit","Success,Work,Failure,Giving"\n' +
          '"Life changes so quickly. feeling grateful to be around such wonderful people to strengthen and grow with.","Riley Keough","Life,Changes,Grateful,People"\n' +
          '"Most small business owners are not particularly sophisticated business people. That\'s not a criticism; they\'re passionate about cutting hair or cooking food, and that\'s why they got in the business, not because they have an MBA.","Andrew Mason","Food,Business,Small,People"\n' +
          '"Nothing helps make a leader more approachable than admitting your struggles, screw-ups and behind-the-scenes thinking on hard calls. If the leader makes this a priority, the whole company will be more open and methodical learning from failure.","Scott Weiss","Learning,Failure,Leader,Thinking"\n' +
          '"Every soldier must know, before he goes into battle, how the little battle he is to fight fits into the larger picture, and how the success of his fighting will influence the battle as a whole.","Bernard Law Montgomery","Success,Influence,Fight,Battle"\n' +
          '"I like being able to walk into an old town and find good local food.","Sienna Miller","Food,Good,Walk,Find"\n' +
          '"Whatever the long-term legal prospects for same-sex marriage, President Obama\'s willingness to put the matter front and center in an election year can at least make him a candidate for inclusion in Kennedy\'s Profiles in Courage.","Robert Dallek","Marriage,Courage,Legal,Election"\n' +
          '"I feel like I\'ve lived a life of making mistakes and learning from them and doing my best to only make each mistake once.","Bre Pettis","Learning,Life,Best,Mistakes"\n' +
          '"We were all born with a certain degree of power. The key to success is discovering this innate power and using it daily to deal with whatever challenges come our way.","Les Brown","Success,Daily,Power,Challenges"\n' +
          '"I believe any success in life is made by going into an area with a blind, furious optimism.","Sylvester Stallone","Success,Life,Optimism,Believe"\n' +
          '"We need to have an educational system that\'s able to embrace all sorts of minds, and where a student doesn\'t have to fit into a certain mold of learning.","James Hillman","Learning,Student,Minds,System"\n' +
          '"Success is peace of mind, which is a direct result of self-satisfaction in knowing you made the effort to become the best of which you are capable.","John Wooden","Success,Peace,Best,Effort"\n' +
          '"Many a friendship, long, loyal, and self-sacrificing, rested at first on no thicker a foundation than a kind word.","Frederick William Faber","Friendship,Foundation,Long,Kind"\n' +
          '"For the poor, learning to manage money well is central to improving their lives.","Ann Cotton","Learning,Money,Poor,Well"\n' +
          '"A friend in power is a friend lost.","Henry Adams","Friendship,Power,Lost,Friend"\n' +
          '"You don\'t have to go looking for love when it\'s where you come from.","Werner Erhard","Love,Looking,You,Go"\n' +
          '"It\'s so different when you change your hair color, you\'re treated so differently. It\'s a very funny experience. It\'s fun - I love changing up my hair.","Kate Bosworth","Love,Funny,Change,Experience"\n' +
          '"The gateways to wisdom and learning are always open, and more and more I am choosing to walk through them. Barriers, blocks, obstacles, and problems are personal teachers giving me the opportunity to move out of the past and into the Totality of Possibilities.","Louise L. Hay","Wisdom,Learning,Opportunity"\n' +
          '"I\'m frugal. I\'m not a very acquisitive woman. I never waste food. If you prepare your own food, you engage with the world, it tastes alive. It tastes good.","Vivienne Westwood","Food,Good,Woman,World"\n' +
          '"To be prepared is half the victory.","Miguel de Cervantes","Success,Victory,Be Prepared,Half"\n' +
          '"Life is full of adventure. There\'s no such thing as a clear pathway.","Guy Laliberte","Life,Adventure,Clear,Pathway"\n' +
          '"Most regular, two-year MBA programs provide both experience and the capacity to link together the essential elements of management such as finance, marketing, organizational behavior, and operations.","Warren Bennis","Finance,Experience,Together"\n' +
          '"We\'re constantly striving for success, fame and comfort when all we really need to be happy is someone or some thing to be enthusiastic about.","H. Jackson Brown, Jr.","Success,Happy,Be Happy,Comfort"\n' +
          '"For me, success is a state of mind. I feel like success isn\'t about conquering something; it\'s being happy with who you are.","Britney Spears","Success,Happy,Being Happy,Mind"\n' +
          '"I emphasize that virtually every engineering calculation is ultimately a failure calculation, because without a failure criterion against which to measure the calculated result, it is a meaningless number.","Henry Petroski","Failure,Engineering,Measure"\n' +
          '"The beauty of age is we grow, we learn. We have more wisdom. And as much as the youth-glorifying Hollywood would like us to believe, it\'s nothing. They\'re wrong.","Sherilyn Fenn","Wisdom,Beauty,Age,Believe"\n' +
          '"Failure usually works for me in the end.","David Hasselhoff","Failure,End,Me,In The End"\n' +
          '"I think you\'re working and learning until you die.","J. K. Rowling","Learning,Think,Die,You"\n' +
          '"Personally, I experience success when I enjoy what I\'m doing. I love the creative process, even if the end result isn\'t embraced by anyone else.","RuPaul","Success,Love,Experience,Creative"\n' +
          '"It was not my wish to come into politics. I was not a public person; I preferred to spend my birthdays with family and friends. But the 2008 elections were fraudulent, so I decided to finance the opposition to make them stronger.","Bidzina Ivanishvili","Finance,Family,Friends,Politics"\n' +
          '"Let us always meet each other with smile, for the smile is the beginning of love.","Mother Teresa","Love,Smile,Beginning,Meet"\n' +
          '"In this world it is not what we take up, but what we give up, that makes us rich.","Henry Ward Beecher","Success,World,Rich,Up"\n' +
          '"Fueled by the kindness and generosity of strangers, \'Food for the Poor\' builds houses for people.","Mike Gallagher","Food,Kindness,People,Generosity"\n' +
          '"Like Lyndon Johnson, President Obama understands that timidity in a time of troubles is a prescription for failure.","Robert Dallek","Failure,Time,President,Troubles"\n' +
          '"The sad truth is that the civil rights movement cannot be reborn until we identify the causes of black suffering, some of them self-inflicted. Why can\'t black leaders organize rallies around responsible sexuality, birth within marriage, parents reading to their children and students staying in school and doing homework?","Henry Louis Gates","Marriage,Children,Truth,Sad"\n' +
          '"All the teaching I had ever received had failed to make me apply such intelligence as I was possessed of, directly and vividly: there had never been any sunshine, as regards language, in the earlier grey days of learning, for the sky had always pelted with gerunds and optatives.","E. F. Benson","Learning,Sky,Intelligence,Language"\n' +
          '"What I cannot love, I overlook. Is that real friendship?","Anais Nin","Friendship,Love,Real,Cannot"\n' +
          '"Sometimes it\'s a form of love just to talk to somebody that you have nothing in common with and still be fascinated by their presence.","David Byrne","Love,You,Talk,Sometimes"\n' +
          '"What is indisputable is the fact that unbelief is the force that gives birth to all of our bad behavior and every moral failure. It is the root.","Tullian Tchividjian","Failure,Behavior,Moral,Birth"\n' +
          '"Art is like a stock with a decent return for people in finance, and they get to feel like they are involved with culture, spend time with artists, as part of their dividend.","Rachel Kushner","Finance,Art,Time,Culture"\n' +
          '"While the public school rewards failure by throwing more government money at failing school systems, the voucher system does the opposite.","Fabrizio Moreira","Failure,Money,School,Government"\n' +
          '"All the children of the great men in Persia are brought up at court, where they have an opportunity of learning great modesty, and where nothing immodest is ever heard or seen.","Xenophon","Learning,Children,Great,Opportunity"\n' +
          '"Ideology, politics and journalism, which luxuriate in failure, are impotent in the face of hope and joy.","P. J. O\'Rourke","Failure,Hope,Politics,Joy"\n' +
          '"Believe that life is worth living and your belief will help create the fact.","William James","Life,Positive,Believe,Help"\n' +
          '"Your success story is a bigger story than whatever you\'re trying to say on stage. Success makes life easier. It doesn\'t make living easier.","Bruce Springsteen","Success,Life,Story,Trying"\n' +
          '"Some people think football is a matter of life and death. I assure you, it\'s much more serious than that.","Bill Shankly","Life,Death,Football,People"\n' +
          '"Marriage, it seems, confines every man to his proper rank.","Jean de la Bruyere","Marriage,Man,Every Man,Seems"\n' +
          '"Whether one admired or was repulsed by the positions he took on matters foreign and domestic, it is undeniable that Reagan\'s ability to project anger was highly attractive to his most passionate supporters on the far right - and crucial to his political success.","Jackson Katz","Success,Anger,Political,Passionate"\n' +
          '"The art of life is to know how to enjoy a little and to endure very much.","William Hazlitt","Life,Art,Enjoy,Know"\n' +
          '"Even in the common affairs of life, in love, friendship, and marriage, how little security have we when we trust our happiness in the hands of others!","William Hazlitt","Marriage,Love,Life,Friendship"\n' +
          '"I\'ve always believed that human learning is the result of relatively simple rules combined with massive amounts of hardware and massive amounts of data.","Sebastian Thrun","Learning,Simple,Data,Rules"\n' +
          '"Every time you use the word \'healthy,\' you lose. The key is to make yummy, delicious food that happens to be healthy.","Marcus Samuelsson","Food,Time,Healthy,Key"\n' +
          '"The high arts of literature and music stand in a curious relationship to one another, at once securely comfortable and deeply uneasy - rather like a long-term marriage.","Will Self","Marriage,Music,Relationship,Stand"\n' +
          '"The lesson of history is that you do not get a sustained economic recovery as long as the financial system is in crisis.","Ben Bernanke","Finance,History,Financial,Crisis"\n' +
          '"Never be a food snob. Learn from everyone you meet - the fish guy at your market, the lady at the local diner, farmers, cheese makers. Ask questions, try everything and eat up!","Rachael Ray","Food,Fish,Questions,Learn"\n' +
          '"In the beginning, Adam was instructed to earn the bread by the sweat of his brow - not Eve. Contrary to conventional wisdom, a mother\'s place is in the home!","Ezra Taft Benson","Wisdom,Home,Mother,Beginning"\n' +
          '"Do the bishops seriously imagine that legalising gay marriage will result in thousands of parties to heterosexual marriages suddenly deciding to get divorced so they can marry a person of the same sex?","Malcolm Turnbull","Marriage,Gay,Sex,Gay Marriage"\n' +
          '"Failure is impossible.","Susan B. Anthony","Failure,Impossible"\n' +
          '"I really wanted to make the worst thing: the thing that even people who liked bad, terrible music wouldn\'t like - the stuff that people would ignore, always. Something really, really stupid. Something that is destined for failure.","Ariel Pink","Failure,Music,Stupid,People"\n' +
          '"All the art of living lies in a fine mingling of letting go and holding on.","Havelock Ellis","Life,Art,Letting Go,Living"\n' +
          '"Marriage is like a game of chess except the board is flowing water, the pieces are made of smoke and no move you make will have any effect on the outcome.","Jerry Seinfeld","Marriage,Water,Chess,Game"\n' +
          '"Urban conservationists may feel entitled to be unconcerned about food production because they are not farmers. But they can\'t be let off so easily, for they are all farming by proxy.","Wendell Berry","Food,Farming,Feel,Farmers"\n' +
          '"Honesty and integrity are absolutely essential for success in life - all areas of life. The really good news is that anyone can develop both honesty and integrity.","Zig Ziglar","Life,Success,Integrity,Good"\n' +
          '"There\'s not an instruction manual on how to deal with success, so you just have to rely on having great friends and a good team.","Bryan Adams","Success,Good,Team,Friends"\n' +
          '"I understand that there\'s a certain energy in youth, no question, in terms of pursuing jobs. But there is wisdom in age. It\'s too bad that the two can\'t come together because I do think that people are dropped from what they\'re really good at too soon.","Rene Russo","Wisdom,Age,Good,Together"\n' +
          '"What we play is life.","Louis Armstrong","Life,Play"\n' +
          '"A man with a silver spoon may get his share of supporters, but he can never be an inspiration for somebody! Patience and hard work are the key to every man\'s success.","Kailash Kher","Success,Work,Hard Work,Patience"\n' +
          '"Being a survivor doesn\'t mean being strong - it\'s telling people when you need a meal or a ride, company, whatever. It\'s paying attention to heart wisdom, feelings, not living a role, but having a unique, authentic life, having something to contribute, finding time to love and laugh. All these things are qualities of survivors.","Bernie Siegel","Wisdom,Love,Life,Time"\n' +
          '"Movies are not novels, and that\'s why, when filmmakers try to adapt novels, particularly long or complex novels, the result is almost always failure. It can\'t be done.","Paul Auster","Failure,Adapt,Long,Movies"\n' +
          '"Alcohol may be man\'s worst enemy, but the bible says love your enemy.","Frank Sinatra","Love,Man,Alcohol,Enemy"\n' +
          '"Spain is a fascinating mix of people, languages, culture and food, but if there is one thing all Spaniards share, it\'s a love of food and drink.","Jose Andres","Food,Love,Culture,People"\n' +
          '"I think it\'s best if there\'s an amendment that goes on the ballot where the people can weigh in. Every time this issue has gone on the ballot, the people have voted to retain the traditional definition of marriage as recently as California in 2008.","Michele Bachmann","Marriage,Time,Best,People"\n' +
          '"I believe in using words, not fists. I believe in my outrage knowing people are living in boxes on the street. I believe in honesty. I believe in a good time. I believe in good food. I believe in sex.","Bertrand Russell","Food,Time,Good,Honesty"\n' +
          '"Failures, repeated failures, are finger posts on the road to achievement. One fails forward toward success.","C. S. Lewis","Success,Failure,Achievement,Road"\n' +
          '"Not engaging in ignorance is wisdom.","Bodhidharma","Wisdom,Ignorance,Engaging"\n' +
          '"Honesty is about the scars. It\'s about the blemishes. But it\'s more than just bragging about failure, which could be a form of ego. It\'s about truly helping people.","James Altucher","Failure,Honesty,Ego,People"\n' +
          '"When we remember we are all mad, the mysteries disappear and life stands explained.","Mark Twain","Life,Remember,Mad,Disappear"\n' +
          '"Fame or perceived success - it all comes from groupthink.","Chance The Rapper","Success,Fame,Perceived"\n' +
          '"Those who have never known the deep intimacy and the intense companionship of mutual love have missed the best thing that life has to give.","Bertrand Russell","Love,Life,Best,Deep"\n' +
          '"There have been a lot of critiques of the finance industry\'s having possibly foisted subprime mortgages on unknowing buyers, and a lot of those kinds of arguments are even more powerful when used against college administrators who are probably in some ways engaged in equally misleading advertising.","Peter Thiel","Finance,Powerful,College"\n' +
          '"I want to use my connections with coaches, players, celebrities, whomever, and if I can take that friendship and use it to help someone else, I\'m going to take advantage of that. I\'m not going to apologize for that.","Tim Tebow","Friendship,Help,Connections,Want"\n' +
          '"The failure of Lehman Brothers demonstrated that liquidity provision by the Federal Reserve would not be sufficient to stop the crisis; substantial fiscal resources were necessary.","Ben Bernanke","Failure,Crisis,Resources"\n' +
          '"Marriage, in life, is like a duel in the midst of a battle.","Edmond About","Marriage,Life,Battle,Like"\n' +
          '"There is not to be found, in all history, any miracle attested by a sufficient number of men, of such unquestioned good sense, education and learning, as to secure us against all delusion in themselves.","David Hume","Learning,Education,History,Good"\n' +
          '"If thou must love me, let it be for naught except for love\'s sake only.","Elizabeth Barrett Browning","Love,Me,Love Me,Only"\n' +
          '"Most of our pocket wisdom is conceived for the use of mediocre people, to discourage them from ambitious attempts, and generally console them in their mediocrity.","Robert Louis Stevenson","Wisdom,People,Mediocrity,Mediocre"\n' +
          '"Of course, with well-masticated food playing the role of social glue, it\'s absolutely essential that everyone clear their plate. Sod the starving kiddies in Africa - it\'s the overfed ones here we need to worry about.","Will Self","Food,Worry,Africa,Here"\n' +
          '"Because of the dog\'s joyfulness, our own is increased. It is no small gift. It is not the least reason why we should honor as love the dog of our own life, and the dog down the street, and all the dogs not yet born.","Mary Oliver","Love,Life,Dog,Small"\n' +
          '"The introduction of many minds into many fields of learning along a broad spectrum keeps alive questions about the accessibility, if not the unity, of knowledge.","Edward Levi","Learning,Knowledge,Unity,Questions"\n' +
          '"When you have a baby, when you feel his love, you feel so at peace with the world. You just want to share the good news and share how happy you feel.","Shakira","Love,Peace,Good,Happy"\n' +
          '"I\'ve had to learn to fight all my life - got to learn to keep smiling. If you smile things will work out.","Serena Williams","Life,Work,Smile,Smiling"\n' +
          '"The most powerful weapon on earth is the human soul on fire.","Ferdinand Foch","Love,Powerful,Soul,Fire"\n' +
          '"There is no question that creative intelligence comes not through learning things you find in books or histories that have already been written, but by focusing on and giving value to experience as it happens.","Antony Gormley","Learning,Experience,Intelligence"\n' +
          '"Man is wise and constantly in quest of more wisdom; but the ultimate wisdom, which deals with beginnings, remains locked in a seed. There it lies, the simplest fact of the universe and at the same time the one which calls forth faith rather than reason.","Hal Borland","Wisdom,Time,Faith,Wise"\n' +
          '"In the 18th century, people began to adopt the radical new idea that love should be the most fundamental reason for marriage and that young people should be free to choose their marriage partners independently.","Jardine Libaire","Marriage,Love,Free,People"\n' +
          '"No, there\'s nothing half so sweet in life as love\'s young dream.","Thomas Moore","Love,Life,Sweet,Dream"\n' +
          '"The two most misused words in the entire English vocabulary are love and friendship. A true friend would die for you, so when you start trying to count them on one hand, you don\'t need any fingers.","Larry Flynt","Love,Friendship,True Friend"\n' +
          '"One measure of friendship consists not in the number of things friends can discuss, but in the number of things they need no longer mention.","Clifton Fadiman","Friendship,Friends,Measure,Things"\n' +
          '"Sometimes I am happy and sometimes not. I am, after all, a human being, you know. And I am glad that we are sometimes happy and sometimes not. You get your wisdom working by having different emotions.","Yoko Ono","Wisdom,Happy,I Am,Know"\n' +
          '"I don\'t like food that\'s too carefully arranged; it makes me think that the chef is spending too much time arranging and not enough time cooking. If I wanted a picture I\'d buy a painting.","Andy Rooney","Food,Time,Chef,Cooking"\n' +
          '"Marriage is not a noun; it\'s a verb. It isn\'t something you get. It\'s something you do. It\'s the way you love your partner every day.","Barbara De Angelis","Marriage,Love,Day,Partner"\n' +
          '"At the center of non-violence stands the principle of love.","Martin Luther King, Jr.","Love,Non-Violence,Principle"\n' +
          '"A dog is the only thing on earth that loves you more than you love yourself.","Josh Billings","Love,Dog,Pet,Love Yourself"\n' +
          '"You can forgive people who do not follow you through a philosophical disquisition; but to find your wife laughing when you had tears in your eyes, or staring when you were in a fit of laughter, would go some way towards a dissolution of the marriage.","Robert Louis Stevenson","Marriage,Laughter,Eyes,Wife"\n' +
          '"The seat of knowledge is in the head; of wisdom, in the heart. We are sure to judge wrong, if we do not feel right.","William Hazlitt","Wisdom,Knowledge,Heart,Judge"\n' +
          '"We need to accept that we won\'t always make the right decisions, that we\'ll screw up royally sometimes - understanding that failure is not the opposite of success, it\'s part of success.","Arianna Huffington","Success,Failure,Decisions"\n' +
          '"Let my skin and sinews and bones dry up, together with all the flesh and blood of my body! I welcome it! But I will not move from this spot until I have attained the supreme and final wisdom.","Buddha","Wisdom,Together,Welcome,Body"\n' +
          '"The secrets of success are a good wife and a steady job. My wife told me.","Howard Nemerov","Success,Good,Job,Wife"\n' +
          '"There is only one happiness in this life, to love and be loved.","George Sand","Love,Life,Happiness,Loved"\n' +
          '"Love is the child of illusion and the parent of disillusion.","Miguel de Unamuno","Love,Love Is,Child,Parent"\n' +
          '"Times of transition are strenuous, but I love them. They are an opportunity to purge, rethink priorities, and be intentional about new habits. We can make our new normal any way we want.","Kristin Armstrong","Love,Opportunity,Priorities"\n' +
          '"We may encounter many defeats but we must not be defeated.","Maya Angelou","Motivational,Defeated,May,Encounter"\n' +
          '"I don\'t know if I believe in marriage. I believe in family, love and children.","Penelope Cruz","Marriage,Love,Family,Children"\n' +
          '"I was a vegetarian first. I had high blood pressure at 27, everybody in my family died of cancer, and I knew it was in the food, so I changed my diet.","John Salley","Food,Family,Pressure,Diet"\n' +
          '"True wisdom comes to each of us when we realize how little we understand about life, ourselves, and the world around us.","Socrates","Life,Wisdom,World,True"\n' +
          '"As we say in the American Institute of Wine and Food, small helpings, no seconds. A little bit of everything. No snacking. And have a good time.","Julia Child","Food,Time,Good,Wine"\n' +
          '"I will give you a definition of a proud man: he is a man who has neither vanity nor wisdom one filled with hatreds cannot be vain, neither can he be wise.","John Keats","Wisdom,Wise,Man,Proud"\n' +
          '"Music is a higher revelation than all wisdom and philosophy.","Ludwig van Beethoven","Wisdom,Music,Philosophy"\n' +
          '"My real adversary has no name, no face, no party. It will never be elected, yet it governs - the adversary is the world of finance.","Francois Hollande","Finance,World,Party,Name"\n' +
          '"Fear of failure, it\'s the greatest motivational tool. It drives me and drives me and drives me.","Jerry West","Motivational,Failure,Fear,Greatest"\n' +
          '"Any time not spent on love is wasted.","Torquato Tasso","Love,Time,Love Is,Wasted"\n' +
          '"In a crowded marketplace, fitting in is a failure. In a busy marketplace, not standing out is the same as being invisible.","Seth Godin","Failure,Busy,Fitting In,Same"\n' +
          '"Life is not easy for any of us. But what of that? We must have perseverance and above all confidence in ourselves. We must believe that we are gifted for something and that this thing must be attained.","Marie Curie","Life,Perseverance,Confidence"\n' +
          '"The man who has won millions at the cost of his conscience is a failure.","B. C. Forbes","Failure,Man,Cost,Conscience"\n' +
          '"Everyone says you\'ve got to do a foundation and legal structure to finance social change. What nonsense!","Bill Drayton","Finance,Change,Foundation,Legal"\n' +
          '"The best way to obtain truth and wisdom is not to ask from books, but to go to God in prayer, and obtain divine teaching.","Joseph Smith, Jr.","Wisdom,Best,Truth,God"\n' +
          '"The government is also looking at further benefits including enhanced capital allowances; the use of Tax Incremental Finance; and extra help from UK Trade and Investment on inward investment and trade opportunities.","Andy Sawford","Finance,Government,Opportunities"\n' +
          '"Financial support is one thing, but I always think what becomes really sacrificial is your time.","Cliff Richard","Finance,Time,Support,Financial"\n' +
          '"I honestly think it is better to be a failure at something you love than to be a success at something you hate.","George Burns","Success,Love,Failure,Hate"\n' +
          '"Our nation\'s Social Security Trust Fund is depleting at an alarming rate, and failure to implement immediate reforms endangers the ability of Americans to plan for their retirement with the options and certainty they deserve.","Pete Sessions","Failure,Trust,Retirement,Security"\n' +
          '"I have not supported same-sex marriage. I have supported civil partnerships and contractual relationships.","Hillary Clinton","Marriage,Partnerships"\n' +
          '"The road to success is always under construction.","Lily Tomlin","Success,Road,Construction"\n' +
          '"Super-ambitious goals tend to be unifying and energizing to people; but only if they believe there\'s a chance of success.","Peter Diamandis","Success,Goals,Believe,People"\n' +
          '"True, a little learning is a dangerous thing, but it still beats total ignorance.","Pauline Phillips","Learning,Education,Ignorance,True"\n' +
          '"Obviously, if I\'m in Argentina, I\'m going to have a steak, but I don\'t love meat, really. I always think about where the food came from and who had to get it.","Julia Stiles","Food,Love,Think,Meat"\n' +
          '"Those who cannot work with their hearts achieve but a hollow, half-hearted success that breeds bitterness all around.","A. P. J. Abdul Kalam","Success,Work,Achieve,Bitterness"\n' +
          '"Friendship\'s the wine of life: but friendship new... is neither strong nor pure.","Edward Young","Friendship,Life,Strong,Wine"\n' +
          '"I\'m less worried about accomplishment - as younger people always can\'t help but be - and more concerned with spending my time well, spending time with my family, and reading, learning things.","Jonathan Safran Foer","Learning,Family,Time,Reading"\n' +
          '"In every aspect of my life, I live under the protection of and in accordance to the laws of this nation. At the end of the day, it\'s a wildlife biological fact and a conservation fact that the game must be managed. There\'s only so much habitat, i.e. food, out there.","Shawn Michaels","Food,Life,Day,End"\n' +
          '"I\'m certain that most couples expect to find intimacy in marriage, but it somehow eludes them.","James Dobson","Marriage,Find,Expect,Certain"\n' +
          '"Wisdom lies neither in fixity nor in change, but in the dialectic between the two.","Octavio Paz","Wisdom,Change,Two,Between"\n' +
          '"Make space in your life for the things that matter, for family and friends, love and generosity, fun and joy. Without this, you will burn out in mid-career and wonder where your life went.","Jonathan Sacks","Life,Love,Family,Friends"\n' +
          '"No man is a failure who is enjoying life.","William Feather","Failure,Life,Man,Who"\n' +
          '"The great thing about baseball is the causality is easy to determine and it always falls on the shoulders of one person. So there is absolute responsibility. That\'s why baseball is psychologically the cruelest sport and why it really requires psychological resources to play baseball - because you have to learn to live with failure.","Michael Mandelbaum","Failure,Responsibility,Baseball"\n' +
          '"I wonder how many times people give up just before a breakthrough - when they are on the very brink of success.","Joyce Meyer","Success,People,Wonder,Up"\n' +
          '"Success is all about persistence and doing the right thing for the long term.","Bruce Rauner","Success,Persistence"\n' +
          '"I\'d rather attempt to do something great and fail than to attempt to do nothing and succeed.","Robert H. Schuller","Motivational,Great,Succeed,Fail"\n' +
          '"We can bring positive energy into our daily lives by smiling more, talking to strangers in line, replacing handshakes with hugs, and calling our friends just to tell them we love them.","Brandon Jenner","Love,Positive,Daily,Friends"\n' +
          '"What is important in life is life, and not the result of life.","Johann Wolfgang von Goethe","Life,Important,Result"\n' +
          '"As an entrepreneur, you never stop learning.","Daymond John","Learning,You,Entrepreneur"\n' +
          '"I am a woman in process. I\'m just trying like everybody else. I try to take every conflict, every experience, and learn from it. Life is never dull.","Oprah Winfrey","Learning,Life,Experience,Woman"\n' +
          '"If a relationship is going wrong, if a marriage is going wrong, the answer cannot simply be to say, \'You can\'t afford to break up because you are going to lose the house.\' The answer has to be only one thing, which is \'I love you.\'","Rory Stewart","Love,Marriage,Relationship"\n' +
          '"Tokyo would probably be the foreign city if I had to eat one city\'s food for the rest of my life, every day. It would have to be Tokyo, and I think the majority of chefs you ask that question would answer the same way.","Anthony Bourdain","Food,Life,Day,City"\n' +
          '"I think everything that you do, you\'re learning. I mean, every movie that you make is like a film school; that\'s one of the things that I enjoy about filmmaking.","Peter Jackson","Learning,School,Enjoy,Think"\n' +
          '"Success is the result of perfection, hard work, learning from failure, loyalty, and persistence.","Colin Powell","Failure,Work,Success,Hard Work"\n' +
          '"True, we love life, not because we are used to living, but because we are used to loving. There is always some madness in love, but there is also always some reason in madness.","Petrarch","Love,Life,Love Life,Madness"\n' +
          '"It\'s easy to impress me. I don\'t need a fancy party to be happy. Just good friends, good food, and good laughs. I\'m happy. I\'m satisfied. I\'m content.","Maria Sharapova","Food,Good,Friends,Happy"\n' +
          '"Money and success don\'t change people; they merely amplify what is already there.","Will Smith","Success,Change,Money,People"\n' +
          '"Same-sex marriage is not the future.","Maggie Gallagher","Marriage,Future,Same-Sex Marriage"\n' +
          '"Every act of conscious learning requires the willingness to suffer an injury to one\'s self-esteem. That is why young children, before they are aware of their own self-importance, learn so easily.","Thomas Szasz","Learning,Leadership,Children,Learn"\n' +
          '"Sometimes I get extremely disturbed with the things that are written. But you can\'t do anything about it. As a celebrity, you are putting yourself out there to be judged, and that\'s fine. I am now learning not to get affected by such things. I am building my career and making choices that I think are right while minding my own business.","Anushka Sharma","Learning,Business,I Am,Choices"\n' +
          '"I have an American son and an American partner, so marriage might logistically make sense at one point. My partner is a stay-at-home father, so if he wants to be on my health plan, or tax wise, or maybe on paper we want to have our I\'s dotted and our T\'s crossed, but emotionally, neither of us really feels the need for it.","Evangeline Lilly","Marriage,Health,Father,Son"\n' +
          '"A new command I give you: Love one another. As I have loved you, so you must love one another.","Jesus Christ","Love,Loved,You,New"\n' +
          '"Grief is in two parts. The first is loss. The second is the remaking of life.","Anne Roiphe","Life,Moving On,Grief,Loss"\n' +
          '"America\'s freedom of religion, and freedom from religion, offers every wisdom tradition an opportunity to address our soul-deep needs: Christianity, Judaism, Islam, Buddhism, Hinduism, secular humanism, agnosticism and atheism among others.","Parker Palmer","Wisdom,Freedom,Opportunity"\n' +
          '"I mean, I\'m very serious with my kids about them comprehending the intricacies of global finance.","Will Smith","Finance,Serious,Mean,Global"\n' +
          '"Every good citizen makes his country\'s honor his own, and cherishes it not only as precious but as sacred. He is willing to risk his life in its defense and is conscious that he gains protection while he gives it.","Andrew Jackson","Life,Good,Risk,Honor"\n' +
          '"I was in kidney failure. I ended up having a kidney transplant on my 21st birthday.","Amy Purdy","Failure,Birthday,Kidney,Up"\n' +
          '"May you live as long as you wish and love as long as you live.","Robert A. Heinlein","Love,Anniversary,Wish,Long"\n' +
          '"My message to the people and rulers of Pakistan is, \'As neighbours, we want peace and friendship and cooperation with you so that together we can change the face of South Asia.\'","Atal Bihari Vajpayee","Friendship,Change,Peace,Together"\n' +
          '"The Universal Zulu Nation stands to acknowledge wisdom, understanding, freedom, justice, and equality, peace, unity, love, and having fun, work, overcoming the negative through the positive, science, mathematics, faith, facts, and the wonders of God, whether we call him Allah, Jehovah, Yahweh, or Jah.","Afrika Bambaataa","Love,Positive,Work,Wisdom"\n' +
          '"The biggest direct influence on my career is Ben Edlund, who gave me my first real professional break and, through his friendship and example, turned me into a writer and a more critical thinker in general.","Christopher McCulloch","Friendship,Influence,Me,Professional"\n' +
          '"One of the reasons people stop learning is that they become less and less willing to risk failure.","John W. Gardner","Learning,Failure,Risk,People"\n' +
          '"People say history is boring, and that is true because people are boring. We haven\'t changed since time began. We\'re still the same. We\'ve obviously made some changes. When we started, it was all about food, clothing and shelter. Now we watch \'Top Chef\', \'Project Runway\', and \'Extreme Makeover: Home Edition.\'","Colin Hay","Food,Time,History,Home"\n' +
          '"I like guitar. It just turned out that it\'s the instrument I learned to play. I have a lot of respect for it, and I\'m learning more and more every day. For me, the classic band setup - guitars, drums, bass - will stay fresh forever. I don\'t know. I\'m still into it.","Mac DeMarco","Learning,Respect,Day,Me"\n' +
          '"Why should anybody be interested in some old man who was a failure?","Ernest Hemingway","Failure,Man,Old Man,Why"\n' +
          '"Marriage is good enough for the lower classes: they have facilities for desertion that are denied to us.","George Bernard Shaw","Marriage,Good,Enough,Us"\n' +
          '"Success is an absurd, erratic thing. She arrives when one least expects her and after she has come may depart again almost because of a whim.","Alice Foote MacDougall","Success,She,Her,Success Is"\n' +
          '"Life is the art of drawing sufficient conclusions from insufficient premises.","Samuel Butler","Life,Art,Drawing,Conclusions"\n' +
          '"Furthermore I will just have to see what the future will bring me. But a change of food whets the appetite.","Jonathan Brandis","Food,Change,Future,Me"\n' +
          '"Love conquers all.","Virgil","Love,Conquers"\n' +
          '"Friendship is inexplicable, it should not be explained if one doesn\'t want to kill it.","Max Jacob","Friendship,Want,Explained,Should"\n' +
          '"I think togetherness is a very important ingredient to family life.","Barbara Bush","Life,Family,Think,Important"\n' +
          '"Spain is finding it very difficult to finance itself with sovereign debt risk premium so high.","Mariano Rajoy","Finance,Risk,Finding,Difficult"\n' +
          '"Basically, I still have the privacy that all celebrities crave, except for those celebrities who feel that privacy reflects some kind of failure on their part.","Albert Brooks","Failure,Privacy,Kind,Feel"\n' +
          '"God has already done everything He\'s going to do. The ball is now in your court. If you want success, if you want wisdom, if you want to be prosperous and healthy, you\'re going to have to do more than meditate and believe; you must boldly declare words of faith and victory over yourself and your family.","Joel Osteen","Success,Family,Wisdom,Faith"\n' +
          '"A life is not important except in the impact it has on other lives.","Jackie Robinson","Life,Impact,Important,Other"\n' +
          '"I do not think that there is any other quality so essential to success of any kind as the quality of perseverance. It overcomes almost everything, even nature.","John D. Rockefeller","Success,Nature,Perseverance"\n' +
          '"With every book, you go back to school. You become a student. You become an investigative reporter. You spend a little time learning what it\'s like to live in someone else\'s shoes.","John Irving","Learning,Time,School,Book"\n' +
          '"TV started for me just as a means of keeping my husband Desi off the road. He\'d been on tour with his band since he got out of the Army, and we were in our 11th year of marriage and wanted to have children.","Lucille Ball","Marriage,Children,Road,Husband"\n' +
          '"The first thing to be said about \'Prague Winter,\' former Secretary of State Madeleine Albright\'s new book, is that she very wisely chooses to confront early on in it her apparent surprise at learning late in life that she was born Jewish.","Michael Korda","Learning,Life,Book,Winter"\n' +
          '"Stop using the word \'bromance.\' Can we please kill that stupid term? We\'re just friends. It\'s called friendship!","Blake Shelton","Friendship,Friends,Stupid,Word"\n' +
          '"Trouble shared is trouble halved.","Lee Iacocca","Wisdom,Trouble,Shared"\n' +
          '"Life isn\'t fair. It\'s true, and you still have to deal with it. Whining about it rarely levels the playing field, but learning to rise above it is the ultimate reward.","Harvey Mackay","Learning,Life,Reward,Rise Above"\n' +
          '"I realized that I was afraid to really, really try something, 100%, because I had never reached true failure.","Trent Reznor","Failure,True,Try,Afraid"\n' +
          '"The Divine of the Lord in heaven is love, for the reason that love is receptive of all things of heaven, such as peace, intelligence, wisdom and happiness.","Emanuel Swedenborg","Wisdom,Love,Happiness,Peace"\n' +
          '"If I were given the opportunity to present a gift to the next generation, it would be the ability for each individual to learn to laugh at himself.","Charles M. Schulz","Learning,Opportunity,Generation"\n' +
          '"A loving heart is the beginning of all knowledge.","Thomas Carlyle","Love,Knowledge,Heart,Beginning"\n' +
          '"Children love and want to be loved and they very much prefer the joy of accomplishment to the triumph of hateful failure. Do not mistake a child for his symptom.","Erik Erikson","Failure,Love,Children,Joy"\n' +
          '"When I exercise, I like to take lots of different classes because I want to really apply myself and feel like I\'m learning a new skill. Not that I ever want to have to demonstrate any of those skills!","Zooey Deschanel","Learning,Myself,Exercise,Want"\n' +
          '"Don\'t flatter yourselves that friendship authorizes you to say disagreeable things to your intimates. On the contrary, the nearer you come into relation with a person, the more necessary do tact and courtesy become.","Oliver Wendell Holmes, Sr.","Friendship,You,Person,Courtesy"\n' +
          '"My life is about ups and downs, great joys and great losses.","Isabel Allende","Life,Moving On,Great,My Life"\n' +
          '"Wars and elections are both too big and too small to matter in the long run. The daily work - that goes on, it adds up.","Barbara Kingsolver","Life,Work,Daily,Small"\n' +
          '"Coming to terms with the fact that my marriage was a failure was devastating and very difficult.","Sarah McLachlan","Marriage,Failure,Difficult,Fact"\n' +
          '"Learning and innovation go hand in hand. The arrogance of success is to think that what you did yesterday will be sufficient for tomorrow.","William Pollard","Success,Learning,Innovation"\n' +
          '"Every marriage is a mystery to me, even the one I\'m in. So I\'m no expert on it.","Hillary Clinton","Marriage,Me,Mystery,Expert"\n' +
          '"We at Chrysler borrow money the old-fashioned way. We pay it back.","Lee Iacocca","Finance,Money,Way,Back"\n' +
          '"About the only problem with success is that it does not teach you how to deal with failure.","Tommy Lasorda","Failure,Success,Problem,You"\n' +
          '"Now you can get artisanal everything - pickles, coffees, house-cured meats, mustard. The pendulum has swung back to this kind of food, and it gives me the greatest hope for the future, especially because we\'re living in a time with issues like polluted Gulf Coast seafood and food labeled organic that may not really be organic.","Adam Richman","Food,Time,Hope,Future"\n' +
          '"Everyone can relate to love, hurt, pain, learning how to forgive, needing to get over, needing the power of God in their life.","Tyler Perry","Learning,Love,Life,Moving On"\n' +
          '"What people actually refer to as research nowadays is really just Googling.","Dermot Mulroney","Learning,Research,People,Just"\n' +
          '"I\'m passionate about learning. I\'m passionate about life.","Tom Cruise","Learning,Life,Passionate,About"\n' +
          '"Success is the only motivational factor that a boy with character needs.","Woody Hayes","Success,Motivational,Character,Boy"\n' +
          '"I know my husband really loves me because he takes me to have ribs. He says I\'m the only girl he ever took out who actually ate anything on her plate, as opposed to pushing it around.","Julia Barr","Food,Girl,Husband,Me"\n' +
          '"In the long run, with profits from piracy greater than international finance mobilised to solve the problem, we can expect piracy to increase geographically and in sophistication.","Peter Middlebrook","Finance,Problem,Long,Run"\n' +
          '"Love has no errors, for all errors are the want for love.","William Law","Love,Want,Errors"\n' +
          '"A person has to remember that the road to success is always under construction. You have to get that through your head. That it is not easy becoming successful.","Steve Harvey","Success,Road,Construction"\n' +
          '"God\'s grace is amazing! We\'re saved by grace - God\'s undeserved favor - and we live by grace, which is also God\'s power in our lives to do what we could never do in our own strength. And it\'s all because God is love, and He loves us unconditionally, constantly and completely.","Joyce Meyer","Love,Strength,Power,God"\n' +
          '"Marriage is such a mark of adulthood in my mind.","Mandy Moore","Marriage,Mind,Adulthood,Mark"\n' +
          '"Learning from the past helps to ensure that mistakes are not repeated.","Monica Johnson","Learning,Mistakes,Past,Ensure"\n' +
          '"When service members are discharged, we should express our gratitude for their profound personal sacrifice, not hand them a bill for their hospital food.","Barbara Boxer","Food,Gratitude,Service"\n' +
          '"Overhead will eat you alive if not constantly viewed as a parasite to be exterminated. Never mind the bleating of those you employ. Hold out until mutiny is imminent before employing even a single additional member of staff. More startups are wrecked by overstaffing than by any other cause, bar failure to monitor cash flow.","Felix Dennis","Failure,Mind,You,Flow"\n' +
          '"We really are creatures of a violent world, biologically speaking - watching violence and learning about it is one of our cognitive drives.","Steven Pinker","Learning,World,Violence,Watching"\n' +
          '"I\'ve just concluded - since President Obama endorses the same-sex marriage, advocates homosexual people, and enjoys an attractive countenance - thus if it becomes necessary, I shall travel to Washington, D.C., get down on my knee, and ask his hand.","Robert Mugabe","Marriage,Travel,People,Down"\n' +
          '"The comfortable estate of widowhood is the only hope that keeps up a wife\'s spirits.","John Gay","Marriage,Hope,Wife,Up"\n' +
          '"Anything will give up its secrets if you love it enough. Not only have I found that when I talk to the little flower or to the little peanut they will give up their secrets, but I have found that when I silently commune with people, they give up their secrets also - if you love them enough.","George Washington Carver","Love,Flower,People,Secrets"\n' +
          '"Love is the attempt to form a friendship inspired by beauty.","Marcus Tullius Cicero","Love,Friendship,Beauty,Love Is"\n' +
          '"Life is a journey. When we stop, things don\'t go right.","Pope Francis","Life,Journey,Life Is A"\n' +
          '"What I particularly like about Broadway is the camaraderie and the friendship of other people in other shows. Everybody knows you\'re opening and cares about you. There\'s a real village atmosphere.","Ian Mckellen","Friendship,People,You,Opening"\n' +
          '"Our parents deserve our honor and respect for giving us life itself. Beyond this they almost always made countless sacrifices as they cared for and nurtured us through our infancy and childhood, provided us with the necessities of life, and nursed us through physical illnesses and the emotional stresses of growing up.","Ezra Taft Benson","Life,Respect,Parents,Childhood"\n' +
          '"Sustaining true friendship is a lot more challenging than we give it credit for.","Mariella Frostrup","Friendship,Credit,True"\n' +
          '"Temptation is like a knife, that may either cut the meat or the throat of a man; it may be his food or his poison, his exercise or his destruction.","John Owen","Food,Man,Exercise,Temptation"\n' +
          '"The truest wisdom is a resolute determination.","Napoleon Bonaparte","Wisdom,Determination,Truest"\n' +
          '"Learning is finding out what you already know.","Richard Bach","Learning,Finding,Know,You"\n' +
          '"People are the key to success or extraordinary success.","Azim Premji","Success,Key To Success,People,Key"\n' +
          '"Friendship is the shadow of the evening, which increases with the setting sun of life.","Jean de La Fontaine","Friendship,Life,Sun,Shadow"\n' +
          '"If one advances confidently in the direction of his dreams, and endeavors to live the life which he has imagined, he will meet with a success unexpected in common hours.","Henry David Thoreau","Success,Life,Dreams,Direction"\n' +
          '"No matter how dark the moment, love and hope are always possible.","George Chakiris","Love,Hope,Moment,Dark"\n' +
          '"During the days of segregation, there was not a place of higher learning for African Americans. They were simply not welcome in many of the traditional schools. And from this backward policy grew the network of historical black colleges and universities.","Michael N. Castle","Learning,Welcome,Black,Place"\n' +
          '"I don\'t need to go onto Facebook and pretend to have friends I\'ve never even met. To my mind, that kind of destroys the meaning of the word \'friend.\' I take exception to that. Because I value and respect friendship.","Stefanie Powers","Friendship,Respect,Friends,Mind"\n' +
          '"Sweet is the scene where genial friendship plays the pleasing game of interchanging praise.","Oliver Wendell Holmes, Sr.","Friendship,Sweet,Game,Praise"\n' +
          '"Only those who have learned the power of sincere and selfless contribution experience life\'s deepest joy: true fulfillment.","Tony Robbins","Life,Inspirational,Experience"\n' +
          '"As far as luxury goes, about the only thing I do is... I go first class all the way. I live on the road, so when I\'m out there, I\'m getting the nice hotel suite, I\'m getting the luxury car, I\'m eating the good food, and I make sure I take care of myself on the road.","Trish Stratus","Food,Good,Car,Myself"\n' +
          '"Fear is present when we forget that we are a part of God\'s divine design. Learning to experience authentic love means abandoning ego\'s insistence that you have much to fear and that you are in an unfriendly world. You can make the decision to be free from fear and doubt and return to the brilliant light of love that is always with you.","Wayne Dyer","Learning,Love,Fear,Experience"\n' +
          '"Old age is like everything else. To make a success of it, you\'ve got to start young.","Theodore Roosevelt","Success,Age,Old Age,Start"\n' +
          '"If it\'s a good work of adaptation, the book should remain a book and the film should remain a film, and you should not necessarily read the book to see the film. If you do need that, then that means that it\'s a failure. That is what I think.","Marjane Satrapi","Failure,Work,Good,Book"\n' +
          '"Imagination is more important than knowledge.","Albert Einstein","Wisdom,Knowledge,Imagination"\n' +
          '"I learned to cook in self-defense. My wife doesn\'t know what a kitchen is. In the first month of our marriage, she broiled lamb chops 26 nights in a row. Then I took over. I used to mind her not caring about food, but no more - as long as I can eat what I want.","Alan King","Food,Marriage,Caring,Wife"\n' +
          '"People are more comfortable learning about wine because now they can just Google, you know, \'Soave,\' and say, \'Oh, O.K., cool.\'","Gary Vaynerchuk","Learning,Wine,Cool,People"\n' +
          '"The Tea Party people say they\'re angry about socialism, but maybe they\'re really angry about capitalism. If there\'s a sense of being looked down upon, it\'s that sense of failure that\'s built into a system that assures everyone they can make it to the top, but then reserves the top for only a tiny fraction of the strivers.","Gail Collins","Failure,Socialism,People,Angry"\n' +
          '"What sort of job can you hold in America in which it is safe to hold the personal conviction that same-sex marriage is wrong? The answer: there is no such job. Except Democratic presidential candidate in 2008. Then you\'re fine.","Ben Shapiro","Marriage,America,Job,You"\n' +
          '"What the world really needs is more love and less paper work.","Pearl Bailey","Love,Work,World,Paper"\n' +
          '"A happy life is one which is in accordance with its own nature.","Lucius Annaeus Seneca","Life,Nature,Happy,Happy Life"\n' +
          '"But friendship is precious, not only in the shade, but in the sunshine of life, and thanks to a benevolent arrangement the greater part of life is sunshine.","Thomas Jefferson","Friendship,Life,Sunshine,Precious"\n' +
          '"Marriage, for a woman at least, hampers the two things that made life to me glorious - friendship and learning.","Jane Harrison","Marriage,Life,Friendship,Learning"\n' +
          '"Every failure is a step to success.","William Whewell","Success,Failure,Step,Every"\n' +
          '"I am not a stickler for Indian food, but by the third day or so I start looking for something familiar to eat. I have travelled a lot, and I always try out local food.","Shaan","Food,Day,I Am,Start"\n' +
          '"The hardest of all is learning to be a well of affection, and not a fountain; to show them we love them not when we feel like it, but when they do.","Nan Fairbrother","Learning,Love,Affection,Well"\n' +
          '"Learning how to learn is the most precious thing we have in life.","John Naisbitt","Learning,Life,Learn,Precious"\n' +
          '"We learned in World War II that no single nation holds a monopoly on wisdom, morality or right to power, but that we must fight for the weak and promote democracy.","Joe Baca","Wisdom,War,Power,Democracy"\n' +
          '"I don\'t think men are that attracted by glamour. I think women are attracted by glamour. I think men are attracted by a sense of friendship.","Joanna Lumley","Friendship,Women,Men,Think"\n' +
          '"When you fail you learn from the mistakes you made and it motivates you to work even harder.","Natalie Gulbis","Motivational,Work,Mistakes,Learn"\n' +
          '"Rich people without wisdom and learning are but sheep with golden fleeces.","Solon","Learning,Wisdom,People,Rich"\n' +
          '"I have long enjoyed the friendship and companionship of Republicans because I am by instinct a teacher, and I would like to teach them something.","Woodrow Wilson","Friendship,Teacher,Politics,I Am"\n' +
          '"The toughest thing about success is that you\'ve got to keep on being a success.","Irving Berlin","Success,You,Success Is,Being"\n' +
          '"I\'m not afraid of storms, for I\'m learning how to sail my ship.","Louisa May Alcott","Learning,Fear,Ship,Storms"\n' +
          '"It doesn\'t matter whether you are pursuing success in business, sports, the arts, or life in general: The bridge between wishing and accomplishing is discipline.","Harvey Mackay","Life,Success,Business,Sports"\n' +
          '"It is the food which you furnish to your mind that determines the whole character of your life.","Emmet Fox","Food,Life,Character,Mind"\n' +
          '"Imagine all the people living life in peace. You may say I\'m a dreamer, but I\'m not the only one. I hope someday you\'ll join us, and the world will be as one.","John Lennon","Life,Hope,Peace,World"\n' +
          '"I am very, very strict with my workout regimen; not so much with my food, because I\'m always working out, so I can allow myself to be a bit more naughty!","Barbara Fialho","Food,Myself,I Am,I Can"\n' +
          '"If your current get-rich project fails, take what you learned and try something else. Keep repeating until something lucky happens. The universe has plenty of luck to go around; you just need to keep your hand raised until it\'s your turn. It helps to see failure as a road and not a wall.","Scott Adams","Failure,Road,Luck,Universe"\n' +
          '"To want friendship is a great fault. Friendship ought to be a gratuitous joy, like the joys afforded by art or life.","Simone Weil","Friendship,Life,Art,Great"\n' +
          '"In a deeply tribal sense, we love our monsters, and I think that is the key to it right there. It is monsters; it is learning about them: it is both thrill and safety. You can think of them without being desperately afraid because they are not going to come into your living room and eat you. That is \'Jaws.\'","Peter Benchley","Learning,Love,Safety,Think"\n' +
          '"Nothing brings me more happiness than trying to help the most vulnerable people in society. It is a goal and an essential part of my life - a kind of destiny. Whoever is in distress can call on me. I will come running wherever they are.","Princess Diana","Life,Happiness,Society,Goal"\n' +
          '"Every decision we make - when we choose a vehicle, when we pump gas into that vehicle, when we order food - is not just a personal lifestyle choice. It\'s an environmental and moral choice.","Jane Velez-Mitchell","Food,Environmental,Decision"\n' +
          '"When you dance together, there\'s a fabulous interaction. It\'s quite intimate. You\'re touching your partner, leading them. Learning how to behave in that person\'s proximity is a skill. I love it. I can\'t imagine tiring of it.","Anton du Beke","Learning,Love,Together,Dance"\n' +
          '"Death is not the greatest loss in life. The greatest loss is what dies inside us while we live.","Norman Cousins","Life,Death,Sympathy,Loss"\n' +
          '"Qualities you need to get through medical school and residency: Discipline. Patience. Perseverance. A willingness to forgo sleep. A penchant for sadomasochism. Ability to weather crises of faith and self-confidence. Accept exhaustion as fact of life. Addiction to caffeine a definite plus. Unfailing optimism that the end is in sight.","Khaled Hosseini","Life,Perseverance,Faith"\n' +
          '"It\'s a European Union of economic failure, of mass unemployment and of low growth.","Nigel Farage","Failure,Growth,Economic"\n' +
          '"Follow your passion. Nothing - not wealth, success, accolades or fame - is worth spending a lifetime doing things you don\'t enjoy.","Jonathan Sacks","Success,Passion,Enjoy,Wealth"\n' +
          '"Once you label me you negate me.","Soren Kierkegaard","Wisdom,Me,You,Once"\n' +
          '"Rare as is true love, true friendship is rarer.","Jean de La Fontaine","Friendship,Love,True Love,True"\n' +
          '"Past success is no guarantee of future success, so I have learned to be an entrepreneur. I began to produce and direct my own projects.","Ian Ziering","Success,Future,Past,Entrepreneur"\n' +
          '"During my undergraduate training at UCLA, I was studying finance and securities; my particular interest was with mutual funds. Wanting to get into a high position at some of the companies that were doing that, I knew that law would be useful.","Robert Shapiro","Finance,Training,Law,Studying"\n' +
          '"The consequence of the Bay of Pigs failure wasn\'t an acceptance of Castro and his control of Cuba but, rather, a renewed determination to bring him down by stealth.","Robert Dallek","Failure,Determination,Acceptance"\n' +
          '"Think little goals and expect little achievements. Think big goals and win big success.","David Joseph Schwartz","Success,Leadership,Goals,Win"\n' +
          '"A man reserves his true and deepest love not for the species of woman in whose company he finds himself electrified and enkindled, but for that one in whose company he may feel tenderly drowsy.","George Jean Nathan","Love,Man,Woman,Company"\n' +
          '"In \'Citizens United v. FEC\', the Supreme Court ruled that sections of the federal campaign finance law known as McCain-Feingold imposed unconstitutional restrictions on the First Amendment rights of corporations.","Eric Schneiderman","Finance,Law,First Amendment,Rights"\n' +
          '"An unschooled man who knows how to meditate upon the Lord has learned far more than the man with the highest education who does not know how to meditate.","Charles Stanley","Learning,Education,Man,Know"\n' +
          '"I believe that the essence of marriage is choosing someone who loves you for who you are, embraces everything about you, and building a life with that person. Whether that life is with children or without children - it\'s honestly immaterial to building a life with someone that you love fully.","Aisha Tyler","Marriage,Love,Life,Children"\n' +
          '"You and I come by road or rail, but economists travel on infrastructure.","Margaret Thatcher","Finance,Travel,Road,You"\n' +
          '"Keep it simple in the kitchen. If you use quality ingredients, you don\'t need anything fancy to make food delicious: just a knife, a cutting board, and some good nonstick cookware, and you\'re set.","Curtis Stone","Food,Good,Quality,Simple"\n' +
          '"I don\'t really consider myself to be a personal finance expert compared with some others. There are quite a few that know a lot more than I do.","Ben Stein","Finance,Myself,Know,Personal"\n' +
          '"The purpose of a moral philosophy is not to look delightfully strange and counterintuitive or to provide employment to bioethicists. The purpose is to guide our choices toward life, health, beauty, happiness, fun, laughter, challenge, and learning.","Eliezer Yudkowsky","Learning,Life,Happiness,Beauty"\n' +
          '"What we now call \'finance\' is, I hold, an intellectual perversion of what began as warm human love.","Robert Graves","Finance,Love,Intellectual,Human"\n' +
          '"I always want to be a messenger, a person that, you know, that\'s not afraid to pass on wisdom.","Mary J. Blige","Wisdom,Know,You,Want"\n' +
          '"Around the time I graduated from high school, I decided better to underachieve and have friendship than to overachieve and be alone.","Evangeline Lilly","Friendship,Time,School,Alone"\n' +
          '"Of course I believe in love despite four divorces. There is nobody who doesn\'t believe in love. But marriage - that fits some people but obviously not me.","Sean Bean","Marriage,Love,Believe,People"\n' +
          '"Start with God - the first step in learning is bowing down to God; only fools thumb their noses at such wisdom and learning.","King Solomon","Learning,Wisdom,God,Step"\n' +
          '"I spent a college semester in a small town in Italy - and that is where I truly tasted food for the first time.","Alton Brown","Food,Time,College,Small"\n' +
          '"Lead yourself whenever your boss\' leadership deteriorates. When your boss doesn\'t praise what you do, praise yourself. When your boss doesn\'t make you big, make yourself big. Remember, if you have done your best, failure does not count.","Mario Teguh","Failure,Leadership,Best,Boss"\n' +
          '"I find writing very difficult. It\'s hard and it hurts sometimes, and it\'s scary because of the fear of failure and the very unpleasant feeling that you may have reached the limit of your abilities.","Tony Kushner","Failure,Fear,Writing,Limit"\n' +
          '"Sometimes we never see what failure is and often fail to recognize it.","Naveen Jain","Failure,Sometimes,Fail,See"\n' +
          '"Being human means you will make mistakes. And you will make mistakes, because failure is God\'s way of moving you in another direction.","Oprah Winfrey","Failure,God,Mistakes,Moving"\n' +
          '"When life is too easy for us, we must beware or we may not be ready to meet the blows which sooner or later come to everyone, rich or poor.","Eleanor Roosevelt","Life,Easy,Rich,Poor"';
        comments = comments.split('"')
        comments = comments.filter(element => {
          let trimmedElement = element.trim();
          element = trimmedElement.replace(/[,:\-+\n\s]+/g, '');
          return element.trim().length > 0 && !/^\s*$/.test(element);
        });

        return comments[(Math.floor(Math.random() * comments.length))]?.substring(0, 200) || '';
      }

      function getElementInViewPort(querySelector, getAll = false) {
        const elements = document.querySelectorAll(querySelector);
        const elementsInViewport = Array.from(elements).filter(element => {
          const bounding = element.getBoundingClientRect();
          return (bounding.top >= 0 && bounding.left >= 0 && bounding.right <= window.innerWidth && bounding.bottom <= window.innerHeight);
        });

        if (getAll) {
          return elementsInViewport
        }
        return elementsInViewport[(Math.floor(Math.random() * elementsInViewport.length))];
      }

      function likeAction() {
        const elementClick = getElementInViewPort('[data-testid="like"]')
        if (elementClick) {
          elementClick.click()
        }
      }

      function commentAction() {
        const elementClick = getElementInViewPort('[data-testid="reply"]', true)
        const comment = getComment();

        console.log('comment' + comment)

        if (elementClick[0] && comment) {
          elementClick[0].click()

          setTimeout(function () {
            const tweetInput = document.querySelector('div[aria-labelledby="modal-header"] div[role="textbox"]');
            if (tweetInput) {
              tweetInput.focus();
              document.execCommand('insertText', false, comment);
              tweetInput.dispatchEvent(new Event('change', {bubbles: true}));
              document.querySelector('[data-testid="tweetButton"]').click()
            }
          }, 2000)
        }
      }

      function bookmarkAction() {
        const elementClick = getElementInViewPort('[data-testid="bookmark"]')
        if (elementClick) {
          elementClick.click()
        }
      }

      if (localStorage.getItem("count_get_e") === null || localStorage.getItem("count_get_e") == 'NaN') {
        localStorage.setItem('count_get_e', '0')
      }
      let count_for_get_e = parseInt(localStorage.getItem('count_get_e'))
      count_for_get_e++
      localStorage.setItem('count_get_e', count_for_get_e.toString())

      const rate = (1500 / scroll_timeout - scroll_pixel) + parseInt(Math.floor(Math.random() * 500).toFixed())

      if (count_for_get_e > 1000) {
        localStorage.setItem('count_get_e', '0')
      }

      const action = weightedRandomChoice(['like', 'comment', 'bookmark'], [1000, 800, 800]);
      if (count_for_get_e === 1000) {
        chrome.storage.session.set({is_scroll: false})

        console.log(action)
        if (action === 'like') {
          likeAction()
        } else if (action === 'comment') {
          commentAction()
        } else if (action === 'bookmark') {
          bookmarkAction()
        }
        chrome.storage.session.set({is_scroll: true})
        localStorage.setItem('count_get_e', '0')
      }
    },
    args: [scroll_timeout.scroll_timeout, scroll_pixel.scroll_pixel, is_scroll.is_scroll]
  });
}


function executeScript(script) {
  chrome.tabs.executeScript({
    code: script
  });
}

function stopBotPlay() {
}