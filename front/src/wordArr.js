const tmp = `basic      beach      begin       below       bench       black       blind 

blood       brain      bread      break       bring       brown       build 

carry        catch       chair       cheap       check      child        chose 

class        clean       clear        clock       close      count       cover 

cream      crime       cross       crowd       dance       dream     dress 

drink        drive        early       earth       empty      enjoy      enter 

error        event        every      exist       false       field       fight 

first       floor       focus       force       frame      fresh       front 

fruit      funny       glass        grade      great      green      group 

guess     guest       happy      heart      heavy      horse       house 

human      image       large      later     laugh      learn       leave 

level       light        local       lucky       lunch      magic      major 

march      match        maybe       metal      money      month 

mouse     mouth       movie       music       never       night      noise 

ocean       often        order        other       paper       party      peace 

phone       photo       place       plane       plant       power     press 

price       pride        print       prize       proud       quick      quiet 

reach      ready      right       river       rough      round       scene 

score       sense       serve        shape       share       sharp     shelf 

shirt       shock        short        since       skill        sleep      small 

smart      smile       smoke       sorry       sound       space      speak 

speed        spend       sport       stage       stand       start       steel 

stick        still        stone        store        storm        story      study 

style        sugar       super       sweet      table      taste        teach 

thank       theme       there       thick       thing      think      third 

throw      tight        tired       title        today       total      touch 

tough       tower       train      treat      trust       twice      under 

until        upset        usual       visit       voice      waste      watch 

water       wheel        while       white       whole      woman 

world       worry        write       wrong       young`;
const arr = [];
let tmpArr = [];
tmp
  .replace(/ /g, '')
  .replace(/\n/g, '')
  .split('')
  .forEach((v, i) => {
    tmpArr.push(v);
    if (!((i + 1) % 5)) {
      arr.push(tmpArr);
      tmpArr = [];
    }
  });

const wordArr = arr.map((v) => v.join(''));

export default wordArr;
