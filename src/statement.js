export const statement = `Two armies are preparing for war on either side of a deep valley, in the middle of which lies a
colossal, fortified city where the stolen princess is guarded. Each army, led by a different
general, has the same goal; to destroy the fortified city in the valley and rescue the . However,
the city is known far and wide for its powerful defenses, and the only way for it to be taken
down is if it is stormed by the two armies at the same time. Both generals know this, and so
they have to coordinate their time of attack so that they have a chance at taking down the city.
Unfortunately, the only way for the armies to communicate with each other is by sending
messengers through the valley, dangerously close to the city. Should the messenger be spotted
as he passes through the valley, he will be murdered instantly by the city’s vicious defenders.
One potential solution is for General A to send a message to General B stating a time of attack,
so that both armies can attack at the same time and win. However, if the messenger is killed,
only General A will attack and they will lose the battle along with thousands of soldiers.
What if General A asked General B to send back a message stating that he had received the
message and agreed to the time? Surely this would work, as General A would only attack if he
received the acknowledgement. Alas, this only flips our problem, as if the returning messenger
is killed, General A won’t attack but General B will, losing the battle and thousands of soldiers.
By now, you can recognize the unsolvable nature of this problem. No matter how many
acknowledgements are sent, the general which sent the last acknowledgement can never be
sure whether it has reached the other. Theoretically, an infinite number of messages are
required to achieve consensus on when to attack.
Now let us come to the actual problem statement in hand.`;