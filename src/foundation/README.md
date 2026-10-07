# DOTZERO Foundation consumer layer

PANOPL.IA treats DOTZERO Foundation as the single source of truth for shared identity and interface primitives.

Canonical source: `Bergtripper/dotzero`  
Pinned source commit: `fe86791ec0ceb1514495be9bf5c16030f61767d4`

## Foundation-owned here

- DOTZERO logotype and sign
- `. / 0 / </>` graphic syntax
- typography switch and typography state
- semantic DOTZERO tokens/classes consumed by the app
- scroll-state identity behaviour used by the PANOPL.IA header

## PANOPL.IA-owned outside this directory

- capability matrix
- arsenal profiles
- recipes / workflow graph
- test protocols
- timeline

Do not fork shared visual primitives inside application components. If a generic change is needed, change DOTZERO Foundation first, then sync it into this consumer layer.
